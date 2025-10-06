import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";
import { IUser } from "../model/user.model";

export interface AuthRequest extends Request {
    user?: IUser;
}

export class AuthMiddleware {
    private static instance: AuthMiddleware;
    private authService: AuthService;
    private userService: UserService;
    private constructor() {
        this.authService = AuthService.getInstance();
        this.userService = UserService.getInstance();
     }

    public static getInstance(): AuthMiddleware {
        if (!AuthMiddleware.instance) {
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }

    authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }
        const decoded = await this.authService.verifyToken(token as string);
        const user = await this.userService.getUserById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        (req as AuthRequest).user = user;
        next();
    };

}
