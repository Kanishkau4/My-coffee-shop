import express from "express";
import { MessageController } from "./controller/message.controller";
import { WebhookController } from "./controller/webhook.controller";
import mongoose from "mongoose";
import { APP_CONFIG } from "./config/app.config";

const app = express();
app.use(express.json());

const messageController = new MessageController();
const webhookController = new WebhookController();


// app.post("/send-message", messageController.sentMessage);

//to verify webhook
app.get("/webhook", webhookController.webhook);

//to receive message
app.post("/webhook", webhookController.webhookMessage);

//health check
app.get("/health", (req, res) => {
    res.send("Server is healthy");
});

mongoose.connect(APP_CONFIG.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(APP_CONFIG.PORT, () => {
        console.log(`Server is running on port ${APP_CONFIG.PORT}`);
    });
}).catch((err) => {
    console.log("Failed to connect to MongoDB", err);
});

// app.listen(4000, () => {
//     console.log("Server is running on port 4000");
// });
