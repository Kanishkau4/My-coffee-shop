import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const WHATSAPP_USER_ACCESS_TOKEN = process.env.WHATSAPP_USER_ACCESS_TOKEN;
const VERISON = process.env.VERISON;

const app = express();
app.use(express.json());

app.post("/send-message", async (req, res) => {
    const { phoneNumber, message } = req.body;
    await sendMessage(phoneNumber, message);
    res.status(200).json({ status: "Message Sent Successfully" });
});

async function sendMessage(phoneNumber: string, message: string) {
    let data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": `${phoneNumber}`,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": `${message}`
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://graph.facebook.com/${VERISON}/${PHONE_NUMBER_ID}/messages`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${WHATSAPP_USER_ACCESS_TOKEN}`
        },
        data: data
    };

    await axios.request(config)
        .then((response: any) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error: any) => {
            console.log(error);
        });

}

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
