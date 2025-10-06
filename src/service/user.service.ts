import { ERRORS } from "../constants/errors.constants";
import { UserDao } from "../dao/user.dao";
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

  public async getUserById(id: string): Promise<IUser> {
    try {
      const user = await this.userDao.getUserById(id);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateUser(id: string, user: Partial<IUser>): Promise<IUser> {
    try {
      const updatedUser = await this.userDao.updateUser(id, user);
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}