# Aura Health Art 🎨✨

> Transform your physical and mental state into unique generative art using Google Gemini.

Aura Health Art is a mobile-first web application that connects simulated health metrics (Sleep, Activity, Stress) to the Gemini 2.5 Flash Image model. It interprets your biometric data to generate an abstract "Aura" — a visual representation of your daily wellbeing.

## ✨ Features

*   **Biometric Visualization**: Converts raw numbers (Sleep hours, Steps, Stress levels) into artistic prompts.
*   **Gemini 2.5 Flash Image**: Utilizes Google's latest efficient multimodal model for high-quality, fast image generation.
*   **Mobile-First Design**: Built with a sleek, dark-mode UI optimized for touch devices.
*   **Hono Backend**: Lightweight, Cloud Function-ready backend handling API security and prompt engineering.
*   **Interactive Simulations**: Slider controls to manually adjust health metrics for testing different art outputs.

## 🛠️ Tech Stack

*   **Frontend**: React 19, Vite, TailwindCSS, Lucide Icons.
*   **Backend**: Hono (Node.js adapter), Google GenAI SDK.
*   **AI Model**: `gemini-2.5-flash-image`.

## 🚀 Getting Started

### Prerequisites

You need a **Google GenAI API Key**.
1.  Get one at [Google AI Studio](https://aistudio.google.com/).
2.  Create a `.env` file in the `backend/` directory (or set it in your environment variables):

```bash
API_KEY=your_actual_api_key_here
```

### Installation & Run

**1. Start the Backend**
Open a terminal and navigate to the backend folder:

```bash
cd backend
npm install
export API_KEY=your_key_here  # Or ensure .env is present
npm run dev
# Server runs on http://localhost:8080
```

**2. Start the Frontend**
Open a new terminal in the root folder:

```bash
npm install
npm run dev
# App runs on http://localhost:5173
```

## 📂 Project Structure

```
├── backend/            # Hono server
│   ├── src/index.ts    # API logic & Prompt Engineering
│   └── package.json
├── components/         # React UI Components
├── services/           # Frontend API services
├── App.tsx             # Main React entry
└── vite.config.ts      # Vite configuration
```

## 🎨 Prompt Logic

The backend interprets metrics to construct the prompt:
- **Sleep**: Determines lighting and clarity (Foggy vs Bright).
- **Steps**: Determines kinetic energy and shapes (Static vs Dynamic ribbons).
- **Stress**: Determines color palette and texture (Cool/Smooth vs Chaotic/Jagged).

---
