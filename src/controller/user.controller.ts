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
    
    
};
