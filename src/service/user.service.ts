import { ERRORS } from "../constants/errors.constants";
import { UserDao } from "../dao/user.dao";
import { LoginDTO } from "../dto/login/login.dto";
import { IUser } from "../model/user.model";

export class UserService {
  private userDao: UserDao;
  private static instance: UserService;
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  constructor() {
    this.userDao = UserDao.getInstance();
  }

  public async createUser(user: IUser): Promise<IUser> {
    try {
      const createUser = await this.userDao.createUser(user);
      return createUser;
    } catch (error: any) {
      if (error.code === 11000) {
        console.log(error.errorResponse.errmsg);
        throw new Error(ERRORS.USER_ALREADY_EXISTS);
      }
      console.log(error);
      throw error;
    }
  }

  public async login(user: LoginDTO): Promise<Partial<IUser>> {
    try {
      const loggedInUser = await this.userDao.getUserByEmail(user.email);

      if (!loggedInUser) {
        throw new Error(ERRORS.USER_NOT_FOUND);
      }

      if (loggedInUser.password !== user.password) {
        throw new Error(ERRORS.INVALID_PASSWORD);
      }

      //destructuring the password field for security reasons
      const { password, createdAt, updatedAt, ...userWithoutPassword } = loggedInUser;

      return userWithoutPassword;
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  }

}