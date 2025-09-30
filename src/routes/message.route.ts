import { Router } from "express";
import { MessageController } from "../controller/message.controller";

// Message Router
export class MessageRouter {
    private router: Router;
    
    constructor() {
        this.router = Router();
        this.messageController = new MessageController();
        this.initRoutes();
    }

    private static instance: MessageRouter;
    private messageController: MessageController;
    public static getInstance(): MessageRouter {
        if (!MessageRouter.instance) {
            MessageRouter.instance = new MessageRouter();
        }
        return MessageRouter.instance;
    }

    public initRoutes(){
        this.router.post('/', this.messageController.sentMessage);
    }

    public getRouter(): Router {
        return this.router;
    }

}