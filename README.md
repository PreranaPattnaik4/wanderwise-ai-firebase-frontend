# WanderWise AI: Your Agentic AI Travel Assistant

WanderWise AI is a next-generation, AI-powered travel assistant designed to make trip planning seamless, intuitive, and personalized. Built on a powerful stack of Google technologies, including **Gemini Pro**, **Genkit**, **Firebase**, and **Next.js**, this application showcases the future of agentic AI by transforming user requests into fully-realized, dynamic travel itineraries.



This project was developed and deployed entirely within **Firebase AI Studio**, demonstrating an accelerated, AI-assisted workflow from concept to production.

**Live Project URL:** [https://studio--studio-1458724225-21a14.us-central1.hosted.app/](https://studio--studio-1458724225-21a14.us-central1.hosted.app/)

---

## 🚀 Key Features

*   **Dual-Layer Agentic Architecture**: A sophisticated system featuring a frontend agent (Genkit + Gemini Pro) for user interaction and a powerful backend multi-agent system (Google ADK + Gemini 2.5 Flash) for complex itinerary generation.
*   **Complex Itinerary Generation**: Leverages the backend agentic system to understand complex user prompts and generate detailed, multi-day travel plans by orchestrating specialized agents for flights, stays, and activities.
*   **Conversational AI Assistant**: An intuitive chat interface powered by multiple Genkit flows that can answer questions, provide recommendations, and modify plans on the fly.
*   **Dynamic Backend Integration**: Connects to a FastAPI backend running on Google Cloud Run to fetch itinerary data, demonstrating a robust, decoupled architecture.
*   **Voice-Enabled Input**: Supports voice-to-text for hands-free interaction with the planning form.
*   **Interactive UI**: A modern, responsive interface built with Next.js and ShadCN UI, providing a seamless user experience across devices.
*   **Full Stack Google Ecosystem**: A showcase of Google's cloud and AI technologies working in concert, from development in Firebase AI Studio to hosting on Firebase and AI powered by Gemini.

---

## 🛠️ Tech Stack & Architecture

WanderWise AI is built on a modern, scalable, and AI-native technology stack, demonstrating a powerful synergy across the Google ecosystem.

| Category                | Technology                                                                                                    | Role                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Frontend**            | [**Next.js**](https://nextjs.org/) (App Router), [**React**](https://react.dev/), [**TypeScript**](https://www.typescriptlang.org/) | Provides a high-performance, server-first frontend with a rich, interactive user experience.                       |
| **UI Components**       | [**ShadCN/UI**](https://ui.shadcn.com/), [**Tailwind CSS**](https://tailwindcss.com/)                              | Delivers a beautiful, accessible, and consistent design system that is both professional and easy to maintain.     |
| **Frontend AI**         | [**Genkit**](https://firebase.google.com/docs/genkit), [**Gemini Pro**](https://deepmind.google/technologies/gemini/) | Orchestrates user-facing AI flows, manages intent routing, and handles conversational tasks.                       |
| **Backend AI**          | [**Google ADK**](https://cloud.google.com/vertex-ai/docs/agents/adk-overview), [**Gemini 2.5 Flash**] | A multi-agent system that performs complex reasoning and planning for detailed itinerary generation.             |
| **Backend Framework**   | [**FastAPI**](https://fastapi.tiangolo.com/) on [**Google Cloud Run**](https://cloud.google.com/run)             | A high-performance Python backend serving as the bridge between the frontend and the backend ADK system.           |
| **Platform & Services** | [**Firebase AI Studio**](https://firebase.google.com/docs/aistudio), [**Firebase Hosting**](https://firebase.google.com/docs/hosting), [**Firebase Auth**](https://firebase.google.com/docs/auth) | Provides the IDE, deployment platform, global CDN, and a complete authentication solution.                         |

---

## 📂 Project Structure & Reports

The project follows a standard Next.js App Router structure, with clear separation of concerns. For a detailed technical overview and a deep dive into the AI architecture, please see the reports below:

*   **[Technical Project Report](./PROJECT_REPORT.md)**: A comprehensive overview of the project's architecture, technology stack, and implementation details.
*   **[AI System Design Report](./AI_SYSTEM_DESIGN_REPORT.md)**: A deep dive into the dual-layer agentic architecture, Genkit flows, and the core AI reasoning loop.

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
├── PROJECT_REPORT.md        # Detailed technical report for evaluation
└── AI_SYSTEM_DESIGN_REPORT.md # Deep dive into the agentic architecture
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
