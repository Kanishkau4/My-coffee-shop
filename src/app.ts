import express from "express";
import { MessageController } from "./controller/message.controller";
import { WebhookController } from "./controller/webhook.controller";

const app = express();
app.use(express.json());

const messageController = new MessageController();
const webhookController = new WebhookController();


app.post("/send-message", messageController.sentMessage);
app.get("/webhook", webhookController.webhook);
app.post("/webhook", webhookController.webhookMessage);
app.get("/health", (req, res) => {
    res.send("Server is healthy");
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
