import express from "express";
import { MessageController } from "./controller/message.controller";
import { WebhookController } from "./controller/webhook.controller";

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

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
