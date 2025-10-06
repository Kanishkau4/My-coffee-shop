import { APP_CONFIG } from "../config/app.config";
import { ERRORS } from "../constants/errors.constants";
import { UserDao } from "../dao/user.dao";
import { LoginDTO, LoginResponseDTO } from "../dto/login/login.dto";
import jwt from "jsonwebtoken";
import { IUser, UserType } from "../model/user.model";

export class AuthService {
    private static instance: AuthService;
    private userDao: UserDao;
    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    private constructor() {
        this.userDao = UserDao.getInstance();
    }

    public async login(user: LoginDTO): Promise<LoginResponseDTO> {
        try {
            const loggedInUser = await this.userDao.getUserByEmail(user.email);
            if (!loggedInUser) {
                throw new Error(ERRORS.USER_NOT_FOUND);
            }

            if (loggedInUser.password !== user.password) {
                throw new Error(ERRORS.INVALID_PASSWORD);
            }

            return await this.generateTokens(loggedInUser);

        }
        catch (error: any) {
            throw error;
        }
    }

    public async generateTokens(user: IUser): Promise<LoginResponseDTO> {
        const accessToken = jwt.sign({ id: user._id, type: user.type }, APP_CONFIG.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user._id, type: user.type }, APP_CONFIG.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' });
        return { accessToken, refreshToken };
    }

    public verifyToken(token: string): { id: string, type: UserType } {
        try {
            // remove Bearer from token
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, APP_CONFIG.ACCESS_TOKEN_SECRET as string);
            return decoded as { id: string, type: UserType };
        } catch (error: any) {
            throw new Error(ERRORS.INVALID_TOKEN);
        }
    }
}
