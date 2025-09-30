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
    } catch (error) {
        console.log(error);
      throw error;
    }
  }

}