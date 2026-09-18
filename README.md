
# WanderWise AI: Your Agentic AI Travel Assistant

WanderWise AI is a next-generation, AI-powered travel assistant designed to make trip planning seamless, intuitive, and personalized. Built on a powerful stack of Google technologies, including **Gemini Pro**, **Genkit**, **Firebase**, and **Next.js**, this application showcases the future of agentic AI by transforming user requests into fully-realized, dynamic travel itineraries.

This project was developed and deployed entirely within **Firebase AI Studio**, demonstrating an accelerated, AI-assisted workflow from concept to production.

---

## 🚀 Key Features

*   **Dual-Layer Agentic Architecture**: A sophisticated system featuring a frontend agent (Genkit + Gemini Pro) for user interaction and a powerful backend multi-agent system (Google ADK + Gemini 2.5 Flash) for complex itinerary generation.
*   **Complex Itinerary Generation**: Leverages the backend agentic system to understand complex user prompts and generate detailed, multi-day travel plans by orchestrating specialized agents for flights, stays, and activities.
*   **Conversational AI Assistant**: An intuitive chat interface powered by multiple Genkit flows that can answer questions, provide recommendations, and modify plans on the fly.
*   **Dynamic Backend Integration**: Connects to a FastAPI backend running on Google Cloud Run to fetch itinerary data, demonstrating a robust, decoupled architecture.
*   **Interactive UI**: A modern, responsive interface built with Next.js and ShadCN UI, providing a seamless user experience across devices.

---

## 📂 Project Structure & Reports

The project follows a standard Next.js App Router structure. For a detailed technical overview and a deep dive into the AI architecture, please see the reports below:

*   **[🌍 Technical Project Report](./PROJECT_REPORT.md)**: A comprehensive overview of the project's architecture, technology stack, and implementation details.
*   **[🧠 AI System Design Report](./AI_SYSTEM_DESIGN_REPORT.md)**: A deep dive into the dual-layer agentic architecture, Genkit flows, and the core AI reasoning loop.

---

## 🛠️ Tech Stack & Architecture

| Category                | Technology                                                                                                    | Role                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Frontend**            | **Next.js** (App Router), **React**, **TypeScript**                                                           | High-performance, server-first frontend.                                                                           |
| **UI Components**       | **ShadCN/UI**, **Tailwind CSS**                                                                              | Beautiful, accessible, and consistent design system.                                                               |
| **Frontend AI**         | **Genkit**, **Gemini Pro**                                                                                    | Orchestrates user-facing AI flows and intent routing.                                                              |
| **Backend AI**          | **Google ADK**, **Gemini 2.5 Flash**                                                                          | Multi-agent system for complex reasoning and planning.                                                            |
| **Platform & Services** | **Firebase AI Studio**, **Firebase Hosting**, **Firebase Auth**                                               | IDE, deployment platform, global CDN, and authentication.                                                          |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
