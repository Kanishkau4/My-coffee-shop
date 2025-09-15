import dotenv from "dotenv";
dotenv.config();
export const APP_CONFIG = {
    PHONE_NUMBER_ID: process.env.PHONE_NUMBER_ID,
    WHATSAPP_USER_ACCESS_TOKEN: process.env.WHATSAPP_USER_ACCESS_TOKEN,
    VERISON: process.env.VERISON,
    WEBHOOK_VERIFICATION_PASSWORD: process.env.WEBHOOK_VERIFICATION_PASSWORD,
    PORT : process.env.PORT || 4000
};