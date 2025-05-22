# Todo App

A full-stack Todo application with AI-powered summarization and Slack integration.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Slack and LLM Setup Guidance](#slack-and-llm-setup-guidance)
- [Design and Architecture Decisions](#design-and-architecture-decisions)
- [API Endpoints](#api-endpoints)
- [Environment Variables Example](#environment-variables-example)
- [Notes](#notes)

---

## Project Overview

This project is a Todo application that allows users to manage their tasks. It features:

- A backend built with Node.js, Express, and Supabase (PostgreSQL)
- AI-powered summarization of pending todos using Google Gemini (LLM)
- Automatic posting of summaries to a Slack channel via Incoming Webhooks

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <repo-directory>
```

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` directory (see [Environment Variables Example](#environment-variables-example)).
- Start the backend server:
  ```bash
  npm run dev
  ```
  The backend runs on port 3001 by default.

### 3. Frontend Setup (if applicable)

```bash
cd ../frontend
npm install
npm start
```

- The frontend will typically run on port 3000.

---

## Slack and LLM Setup Guidance

### Slack Webhook Setup

1. Go to [Slack API: Incoming Webhooks](https://api.slack.com/messaging/webhooks).
2. Create a new Slack App (or use an existing one).
3. Add the **Incoming Webhooks** feature.
4. Click **Add New Webhook to Workspace** and select your channel.
5. Copy the generated webhook URL and add it to your `.env` as `VITE_SLACK_WEBHOOK_URL`.

### Google Gemini (LLM) Setup

1. Sign up for [Google AI Studio](https://aistudio.google.com/) and obtain an API key for Gemini.
2. Add your API key to the `.env` file as `VITE_GEMINI_API_KEY`.

---

## Design and Architecture Decisions

- **Backend:**  
  Built with Node.js and Express for RESTful API development and easy scalability.

- **Database:**  
  Supabase (PostgreSQL) is used for reliable, managed storage of todos.

- **AI Summarization:**  
  Google Gemini LLM is used to generate concise, actionable summaries of pending todos.

- **Slack Integration:**  
  Summaries are posted to a Slack channel using Incoming Webhooks, keeping the team updated.

- **Error Handling:**  
  All endpoints include robust error handling for database, AI, and Slack integration failures.

- **Separation of Concerns:**  
  Controllers manage business logic, and configuration (API keys, URLs) is managed via environment variables.

- **Extensibility:**  
  The architecture allows for easy addition of new integrations or AI models.

---

## API Endpoints

**Backend:**

- `GET /todos` — Fetch all todos
- `POST /todos` — Add a new todo
- `DELETE /todos/:id` — Delete a todo
- `PATCH /todos/:id` — Edit a todo
- `POST /todos/summarize` — Summarize pending todos and post to Slack

---

## Environment Variables Example

Create a file called `.env` in your `backend` directory with the following content:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SLACK_WEBHOOK_URL=your_slack_webhook_url
```

---

## Notes

- **Security:** Never commit your API keys or Slack webhook URLs to public repositories.
- **Customization:** You can easily extend this project to support more integrations or AI models.

