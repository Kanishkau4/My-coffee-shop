# WhatsApp Bot

A sophisticated WhatsApp chatbot built with Node.js, TypeScript, and Google's Gemini AI that provides intelligent conversational responses through the WhatsApp Business API.

## Features

- **Webhook Integration**: Secure webhook verification and message handling for WhatsApp Business API
- **AI-Powered Responses**: Leverages Google's Gemini 2.5 Flash model for intelligent conversation
- **Message Persistence**: Stores conversation history in MongoDB for context-aware responses
- **Real-time Communication**: Instant message processing and response delivery
- **Conversation Context**: Maintains chat history (last 5 messages) for coherent conversations
- **Health Monitoring**: Built-in health check endpoint for service monitoring

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI Service**: Google Gemini AI
- **Messaging API**: WhatsApp Business API
- **HTTP Client**: Axios

## Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- MongoDB database
- WhatsApp Business API account with:
  - Phone Number ID
  - Access Token
  - Webhook setup
- Google Gemini API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd whatsapp_bot
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```env
# WhatsApp Business API Configuration
PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_USER_ACCESS_TOKEN=your_access_token
VERISON=v18.0

# Webhook Configuration
WEBHOOK_VERIFICATION_PASSWORD=your_webhook_verify_token

# Application Configuration
PORT=3000

# AI Service Configuration
GEMINI_API_KEY=your_gemini_api_key

# Database Configuration
MONGO_URI=mongodb://localhost:27017/whatsapp_bot
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### Webhook Endpoints
- `GET /webhook` - Webhook verification endpoint for WhatsApp
- `POST /webhook` - Message receiving endpoint for incoming WhatsApp messages

### Health Check
- `GET /health` - Service health check endpoint

## Project Structure

```
src/
├── app.ts                 # Main application entry point
├── config/
│   └── app.config.ts      # Application configuration
├── controller/
│   ├── message.controller.ts    # Message handling controller
│   └── webhook.controller.ts    # Webhook handling controller
├── dao/
│   └── message.dao.ts     # Data access layer for messages
├── dto/
│   ├── messageHistory.dto.ts    # Message history data transfer object
│   ├── webhook.json       # Webhook payload structure
│   └── webhookVerification.dto.ts # Webhook verification DTOs
├── model/
│   └── message.model.ts   # Message data model and schema
└── service/
    ├── gemini.service.ts  # Gemini AI integration service
    ├── message.service.ts # Message processing service
    └── webhook.service.ts # Webhook handling service
```

## Architecture Overview

1. **Webhook Reception**: Incoming WhatsApp messages are received via webhooks
2. **Message Processing**: Messages are parsed and user information extracted
3. **Context Retrieval**: Previous conversation history is fetched from MongoDB
4. **AI Generation**: Gemini AI generates contextual responses based on message history
5. **Response Storage**: Both user messages and AI responses are persisted
6. **Message Delivery**: Responses are sent back through WhatsApp Business API

## Environment Setup for WhatsApp Business API

1. Set up a WhatsApp Business Account
2. Configure webhooks pointing to your `/webhook` endpoint
3. Obtain your Phone Number ID and Access Token
4. Set the webhook verification token in your `.env` file

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.