import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

//Auth Router
export class AuthRouter{
    private router: Router;
    private authController: AuthController;
    private static instance: AuthRouter;
    public static getInstance(): AuthRouter {
        if (!AuthRouter.instance) {
            AuthRouter.instance = new AuthRouter();
        }
        return AuthRouter.instance;
    }

    private constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post('/login', this.authController.login);
        this.router.post('/register', this.authController.register);
    }
    
    public getRouter() {
        return this.router;
    }
}