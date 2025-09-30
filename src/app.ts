import express from "express";
import mongoose from "mongoose";
import { APP_CONFIG } from "./config/app.config";
import { WebhookRouter } from "./routes/webhook.route";
import { UserRouter } from "./routes/user.route";
import { MessageRouter } from "./routes/message.route";

const app = express();
app.use(express.json());

const webhookRouter = WebhookRouter.getInstance();
const messageRouter = MessageRouter.getInstance();
const userRouter = UserRouter.getInstance();


// app.post("/send-message", messageController.sentMessage);

// webhook
app.use("/webhook", webhookRouter.getRouter());

// user
app.use("/user", userRouter.getRouter()); 

// message
app.use("/message", messageRouter.getRouter());

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
