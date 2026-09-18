
# WanderWise AI: Agentic System Design Report

**Project:** WanderWise AI  
**Focus:** Agentic AI Architecture & System Design  
**Date:** July 26, 2024

---

## 1. Introduction: Beyond the Chatbot

WanderWise AI is engineered not as a simple question-and-answer chatbot, but as a true **agentic system**. An agent, in this context, is an AI system capable of understanding a high-level goal, reasoning through the steps required to achieve it, and utilizing a set of tools to execute those steps. This dual-layer architecture separates concerns, allowing for both rapid user-facing interactions and deep, complex backend planning.

## 2. The Core Agentic Loop: Listen, Route, Execute, Respond

The foundation of WanderWise AI's intelligence is a continuous four-stage loop that processes every user interaction.

1.  **Listen (User Input)**: The system receives unstructured input (e.g., "5-day family trip to Bali").
2.  **Route (Intent Recognition)**: A router analyzes the user's intent to select the appropriate "tool" or flow.
3.  **Execute (Dual-Layer Orchestration)**:
    *   **Frontend (Genkit)**: server-side functions encapsulate specific capabilities like Q&A or translations.
    *   **Backend (ADK & Cloud Run)**: Complex requests are delegated to the FastAPI backend, triggering a multi-agent ADK system (Itinerary, Stay, Activities agents).
4.  **Respond (UI Update)**: Structured data guaranteed by Zod schemas ensures the UI renders components reliably.

## 3. The Genkit Flow Arsenal: Modular Frontend Tools

WanderWise AI's capabilities are organized into modular, single-purpose Genkit flows.

| Flow | Purpose & Agentic Role |
| --- | --- |
| `generatePersonalizedItinerary` | **The Master Orchestrator**. Calls the powerful backend ADK system. |
| `answerTravelQuestion` | **The Generalist**. Default conversational fallback for general Q&A. |
| `improveItineraryWithFeedback` | **The Refiner**. Demonstrates stateful, iterative reasoning. |
| `getPackingListSuggestions` | **The Specialist**. Focuses on context-aware logistics. |
| `getLanguageAssistance` | **The Translator**. Handles real-time translation and etiquette. |
| `getTravelSafetyInfo` | **The Guardian**. Provides specialized safety knowledge. |

## 4. Architectural Synergy: The Google Stack

The agentic design is made possible by the seamless integration of:

*   **Gemini Models**: Gemini Flash and Pro enable high-level reasoning and structured output.
*   **Genkit & ADK**: Genkit formalizes frontend "flows," while ADK provides production-grade multi-agent reasoning on the backend.
*   **Cloud Run**: Scalable microservices host the intensive reasoning tasks.
*   **Firebase AI Studio**: Accelerates the development and deployment of agentic workflows.

## 5. Conclusion

WanderWise AI demonstrates a modern, dual-layer agentic system. Its design moves beyond simple prompting to a sophisticated architecture of intent routing, modular flows, and external tool use, providing a blueprint for scalable, reliable AI assistants.
