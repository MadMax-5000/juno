# 🎤 Juno

An AI-powered app to help you practice and prepare for technical interviews through dynamic question generation, real-time feedback, and a modern developer-friendly interface.

---

## 🤖 Introduction

This project is built with **Next.js**, **React**, **Firebase** for authentication, **Zod** for validation, and **Tailwind CSS** for styling. It simulates technical interviews with the help of AI, giving you instant feedback and helping you grow your problem-solving skills in a realistic, interactive way.
---

## ⚙️ Tech Stack

- **Next.js** (App Router)
- **React** & **TypeScript**
- **Firebase** (Authentication)
- **Tailwind CSS** (Styling)
- **Zod** (Validation)
- **Vapi AI** (Voice Interviews)
- **Google Gemini** (AI Responses)

---

## 🔋 Features

- 🔐 **Authentication**: Sign up and sign in with Firebase.
- 🎙️ **AI Interviews**: Take interactive mock interviews with a voice-based AI agent.
- 💬 **Instant Feedback**: Get real-time feedback from the AI on your responses.
- 🧠 **Smart Question Generation**: Interview questions powered by Google Gemini.
- 🖥️ **Dashboard**: Track and manage your interviews.
- 📱 **Responsive UI**: Fully responsive design with Tailwind CSS.
- 🧪 **Zod Validation**: Strong type-safe form validation.

---

## 🤸 Quick Start

### 1. Clone the Repo

```bash
git clone https://github.com/MadMax-5000/juno.git
cd juno
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=
GOOGLE_GENERATIVE_AI_API_KEY=
NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

> Replace these with your actual credentials.

### 4. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔗 Credit

This project was built with guidance and code snippets from [JavaScript Mastery’s Prepwise tutorial](https://github.com/adrianhajdin/ai_mock_interviews). Special thanks to the JSM community!
```

Let me know if you want a section for deployment (e.g., Vercel), screenshots, or badges!
