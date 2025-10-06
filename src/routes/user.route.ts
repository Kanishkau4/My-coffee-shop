import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

// User Router
export class UserRouter {
    private router: Router;
    private static instance: UserRouter;
    private userController: UserController;
    private authMiddleware: AuthMiddleware;
    public static getInstance(): UserRouter {
        if (!UserRouter.instance) {
            UserRouter.instance = new UserRouter();
        }
        return UserRouter.instance;
    }

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.authMiddleware = AuthMiddleware.getInstance();
        this.initRoutes();
    }

    public initRoutes() {
        //localhost:4000/user
        this.router.post('/hello', this.userController.hello);
        this.router.get('/me', this.authMiddleware.authenticateJWT ,this.userController.getCurrentUser);
        this.router.patch('/', this.authMiddleware.authenticateJWT ,this.userController.updateUser);
    }

    public getRouter(): Router {
        return this.router;
    }

}
