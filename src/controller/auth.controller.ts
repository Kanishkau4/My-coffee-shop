import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { LoginDTO } from "../dto/login/login.dto";
import { ERRORS } from "../constants/errors.constants";
import { IUser } from "../model/user.model";
import { UserService } from "../service/user.service";

export class AuthController {
    private authService: AuthService;
    private userService: UserService;

    constructor() {
        this.authService = AuthService.getInstance();
        this.userService = UserService.getInstance();
    }

    // Register
    register = async (req: Request, res: Response) => {
        const user = req.body as unknown as IUser;
        if (!user.name || !user.phoneNumber) {
            res.status(400).json({ message: "Name and phone number are required" });
            return;
        }
        try {
            const createdUser = await this.userService.createUser(user);
            res.status(201).json(createdUser);
        } catch (error: any) {
            if (error.message === ERRORS.USER_ALREADY_EXISTS) {
                res.status(409).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    // Login
    login = async (req: Request, res: Response) => {
        const user = req.body as unknown as LoginDTO;
        if (!user.email || !user.password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        try {
            const loggedInUser = await this.authService.login(user);
            res.status(200).json(loggedInUser);
        } catch (error: any) {
            if (error.message === ERRORS.USER_NOT_FOUND) {
                res.status(404).json({ message: "User not found" });
                return;
            } else if (error.message === ERRORS.INVALID_PASSWORD) {
                res.status(401).json({ message: "Invalid password" });
                return;
            } else {
                res.status(500).json({ message: "Internal server error" });
                return;
            }

        }
    }
}
