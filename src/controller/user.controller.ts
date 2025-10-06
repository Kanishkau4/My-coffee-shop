import { Request, Response } from "express";
import { IUser } from "../model/user.model";
import { UserService } from "../service/user.service";
import { AuthService } from "../service/auth.service";
import { LoginDTO } from "../dto/login/login.dto";
import { ERRORS } from "../constants/errors.constants";

export class UserController {
    private userService: UserService;
    private authService: AuthService;

    constructor() {
        this.userService = UserService.getInstance();
        this.authService = AuthService.getInstance();
    }
    
    hello = async (req: Request, res: Response) => {
        res.status(200).json({ message: "Hello World" });
    }

    getCurrentUser = async (req: Request, res: Response) => { 
        try { 
            const token = req.headers.authorization;
            const decoded = await this.authService.verifyToken(token as string);
            const user = await this.userService.getUserById(decoded.id);
            console.log(user);
            res.status(200).json(user);
        } catch (error: any) {
            if (error.message === ERRORS.INVALID_TOKEN) { 
                res.status(401).json({ message: "Invalid token" });
                return; 
            } else { 
                res.status(500).json({ message: "Internal server error" });
                return; 
            }
        }
    }
    
};
