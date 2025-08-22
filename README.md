# Cleaning Bot - AI Chatbot Assistant

## Overview

Cleaning Bot is an interactive web application featuring Anna, a witty female robot assistant specialized in providing cleaning advice and instructions. The application offers a user-friendly interface where users can chat with Anna to get detailed step-by-step cleaning instructions, tips, and guidance for various cleaning tasks.

## Features

- **AI-Powered Cleaning Assistant**: Get expert cleaning advice from Anna, a specialized cleaning assistant
- **User Authentication**: Secure signup and login functionality with both local and Google OAuth options
- **Chat History**: Save and access previous conversations
- **Temperature Control**: Adjust the AI's creativity level from conservative to creative
- **Responsive Design**: Works on both desktop and mobile devices
- **Cleaning Schedule**: Plan and manage your cleaning tasks with the built-in scheduler

## Technology Stack

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** for database storage with **Mongoose** ODM
- **Passport.js** for authentication (Local and Google OAuth)
- **OpenAI API** integration for AI chat functionality
- **Express Session** for session management

### Frontend
- **HTML5**, **CSS3**, and **JavaScript**
- **Font Awesome** for icons
- **Local Storage** for client-side data persistence

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- OpenAI API key

### Setup

1. Clone the repository

```bash
git clone <repository-url>
cd ai-project
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
AZURE_OPENAI_KEY=your_openai_api_key
AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint
AZURE_DEPLOYMENT_NAME=your_azure_deployment_name
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Start the server

```bash
npm start
```

5. Access the application at `http://localhost:4000`

## Usage

### User Registration and Login
1. Click the "Sign up" button in the top-right corner
2. Create an account or log in with existing credentials
3. Alternatively, use Google authentication

### Chatting with Anna
1. Type your cleaning-related question in the input field
2. Adjust the temperature slider to control Anna's response style:
   - Conservative: More focused and direct answers
   - Balanced: Moderate creativity and detail
   - Creative: More elaborate and detailed responses
3. Press Enter or click the send button to submit your question

### Managing Chat History
- Create a new chat by clicking the "New Chat" button
- View previous conversations in the history panel on the left

### Scheduling Cleaning Tasks
- Click the calendar icon to open the cleaning scheduler
- Add, edit, or delete cleaning tasks as needed

## Project Structure

```
├── models/              # Database models
│   ├── ChatSession.js   # Chat session schema
│   └── User.js          # User schema
├── public/              # Frontend assets
│   ├── index.html       # Main HTML file
│   ├── script.js        # Frontend JavaScript
│   ├── style.css        # CSS styles
│   └── scheduler.js     # Cleaning scheduler functionality
├── .env                 # Environment variables
├── package.json         # Project dependencies
├── passport-config.js  # Authentication configuration
└── server.js           # Main server file
```

## License

ISC

## Author

[Krishnendu Manna , Kumar Prince]

---

