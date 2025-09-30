import { Router } from "express";
import { WebhookController } from "../controller/webhook.controller";

// Webhook Router
export class WebhookRouter{
    static getRouter(): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
        throw new Error("Method not implemented.");
    }
    private router: Router;
    private static instance: WebhookRouter;
    private webhookController: WebhookController;
    public static getInstance(): WebhookRouter {
        if (!WebhookRouter.instance) {
            WebhookRouter.instance = new WebhookRouter();
        }
        return WebhookRouter.instance;
    }

    constructor() {
        this.router = Router();
        this.webhookController = new WebhookController();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/', this.webhookController.webhook);
        this.router.post('/', this.webhookController.webhookMessage);
    }

    public getRouter() {
        return this.router;
    }
}