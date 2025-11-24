# WanderWise AI: Your Agentic AI Travel Assistant

WanderWise AI is a next-generation, AI-powered travel assistant designed to make trip planning seamless, intuitive, and personalized. Built on a powerful stack of Google technologies, including **Gemini Pro**, **Genkit**, **Firebase**, and **Next.js**, this application showcases the future of agentic AI by transforming user requests into fully-realized, dynamic travel itineraries.

![WanderWise AI Screenshot](https://storage.googleapis.com/aistudio-hosting-project-images/b4c29ce2-b258-4581-893c-24f61f77d337.png)

This project was developed and deployed entirely within **Firebase AI Studio**, demonstrating an accelerated, AI-assisted workflow from concept to production.

**Live Project URL:** [https://studio--studio-1458724225-21a14.us-central1.hosted.app/](https://studio--studio-1458724225-21a14.us-central1.hosted.app/)

---

## 🚀 Key Features

*   **Agentic Itinerary Generation**: Leverages Gemini Pro to understand complex user prompts and generate detailed, multi-day travel plans.
*   **Conversational AI Assistant**: An intuitive chat interface powered by multiple Genkit flows that can answer questions, provide recommendations, and modify plans on the fly.
*   **Dynamic Backend Integration**: Connects to a FastAPI backend running on Google Cloud Run to fetch itinerary data, demonstrating a robust, decoupled architecture.
*   **Voice-Enabled Input**: Supports voice-to-text for hands-free interaction with the planning form.
*   **Interactive UI**: A modern, responsive interface built with Next.js and ShadCN UI, providing a seamless user experience across devices.
*   **Full Stack Google Ecosystem**: A showcase of Google's cloud and AI technologies working in concert, from development in Firebase AI Studio to hosting on Firebase and AI powered by Gemini.

---

## 🛠️ Tech Stack & Architecture

WanderWise AI is built on a modern, scalable, and AI-native technology stack, demonstrating a powerful synergy across the Google ecosystem.

| Category          | Technology                                                                                                  | Role                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Frontend**      | [**Next.js**](https://nextjs.org/) (with App Router), [**React**](https://react.dev/), [**TypeScript**](https://www.typescriptlang.org/) | Provides a high-performance, server-first frontend with a rich, interactive user experience.                     |
| **UI Components** | [**ShadCN/UI**](https://ui.shadcn.com/), [**Tailwind CSS**](https://tailwindcss.com/)                            | Delivers a beautiful, accessible, and consistent design system that is both professional and easy to maintain.   |
| **AI Framework**  | [**Genkit**](https://firebase.google.com/docs/genkit)                                                         | Orchestrates the AI logic, defining flows, tools, and prompts to create a true agentic system.                   |
| **AI Model**      | [**Gemini Pro**](https://deepmind.google/technologies/gemini/)                                                | The core intelligence, responsible for reasoning, planning, and generating human-like, context-aware responses. |
| **Backend**       | [**FastAPI**](https://fastapi.tiangolo.com/) on [**Google Cloud Run**](https://cloud.google.com/run)           | A high-performance Python backend for serving core business logic, such as itinerary generation.               |
| **Platform**      | [**Firebase AI Studio**](https://firebase.google.com/docs/aistudio)                                           | The integrated development environment used for AI-assisted coding, deployment, and hosting.                     |
| **Services**      | [**Firebase Hosting**](https://firebase.google.com/docs/hosting), [**Firebase Auth**](https://firebase.google.com/docs/auth) | Provides fast, secure hosting for the web app and a complete authentication solution.                            |

---

## 📂 Project Structure

The project follows a standard Next.js App Router structure, with clear separation of concerns.

```
wanderwise-ai-firebase/
├── src/
│   ├── ai/                  # Genkit flows, prompts, and AI core logic
│   │   ├── flows/           # Individual AI capabilities (e.g., itinerary, chat)
│   │   └── genkit.ts        # Genkit initialization
│   ├── app/                 # Next.js pages and layouts
│   ├── components/          # Reusable React components (UI, layout, etc.)
│   │   ├── ui/              # ShadCN UI components
│   │   └── wanderwise/      # App-specific components (Hero, Itinerary, etc.)
│   ├── firebase/            # Firebase configuration and initialization
│   └── lib/                 # Utility functions and shared logic
├── public/                  # Static assets (images, fonts)
├── .env                     # Environment variables (for backend URL)
└── PROJECT_REPORT.md        # Detailed technical report for evaluation
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
