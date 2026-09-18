
# WanderWise AI: Technical Project Report

**Project:** WanderWise AI – An Agentic Travel Assistant  
**Author:** An AI Assistant from Google, via Firebase AI Studio  
**Date:** July 26, 2024

## 1. Executive Summary

WanderWise AI is a next-generation, agentic travel assistant designed to demonstrate how modern AI systems can perform complex, multi-step reasoning and orchestration. Developed entirely within Firebase AI Studio and deployed using Google Cloud technologies, the application goes far beyond a simple chatbot.

The system integrates two coordinated agentic layers:

**Frontend Agentic Layer**
Powered by Genkit and Gemini Pro, this layer handles conversational understanding, user intent routing, and lightweight reasoning tasks such as answering travel questions, generating packing lists, or providing language assistance.

**Backend Agentic Layer**
A more powerful, multi-agent reasoning pipeline built using Google ADK (Agents Development Kit) and Gemini 2.5 Flash. This layer orchestrates specialized agents—such as itinerary, flights, stays, and activities agents—to generate rich, structured multi-day travel itineraries.

Together, these layers form a robust, scalable agentic AI system capable of transforming high-level user requests (e.g., “Plan a 5-day trip to Bali under ₹60,000 with adventure activities”) into structured, contextual, and actionable travel plans.

## 2. Technical Architecture

WanderWise AI is designed with a clean separation between the:
- **Frontend** (user interface + client-side agentic pipeline),
- **Backend** (server-side multi-agent ADK system),
- **AI Orchestration** (Genkit + ADK),
- **Deployment Layer** (Firebase Hosting + Cloud Run).

### 2.1 Frontend (Next.js on Firebase Hosting)

The frontend is built using Google-recommended modern web tooling and optimized for performance, developer velocity, and clean user experience.

**Key Technologies**
- **Next.js (App Router)** — Server-first rendering, fast routing, low JS overhead
- **React 18 + TypeScript** — Component-driven UI backed by strong typing
- **Tailwind CSS** — Utility-first styling for responsive UI
- **ShadCN/UI** — Production-grade, accessible UI components
- **React Context** — Manages global itinerary and chat state

### 2.2 Frontend Agentic Layer (Genkit + Gemini Pro)

Genkit is used to implement the client-side agentic workflow.

**Key Components**
- **Genkit Flows** — Modular AI abilities such as `generatePersonalizedItinerary`, `answerTravelQuestion`, `getLanguageAssistance`, etc.
- **Zod Schemas** — Ensure structured input/output for reliable responses.
- **Intent Router** inside `SideAssistant.tsx` — Maps user messages to appropriate flows.
- **Gemini Pro API** — Performs reasoning, language tasks, and travel Q&A.

### 2.2b Backend Agentic Layer (Google ADK + Gemini 2.5 Flash)

The backend is a full multi-agent intelligence system, separate from the frontend’s Genkit flows. It performs the heavy reasoning required for multi-day itinerary generation.

**Google ADK (Agents Development Kit)**
ADK enables modular, scalable, production-grade multi-agent orchestration. The backend implements five specialized agents:
1. **Host Agent** — Central orchestrator that routes messages.
2. **Simple Itinerary Agent** — Builds day-by-day structure.
3. **Stay Agent** — Suggests hotels and accommodations.
4. **Activities Agent** — Curates activities and sightseeing spots.
5. **Flight Agent** — Handles flight-related queries (simulated).

**FastAPI Integration**
FastAPI acts as the HTTP interface between Genkit (frontend) and ADK (backend). The frontend Genkit flow sends a trip request to FastAPI, which triggers the ADK host agent, aggregates the multi-agent results, and returns structured JSON.

### 2.4. Platform & Services (Firebase)
- **Firebase AI Studio** — Integrated development environment.
- **Firebase Hosting** — Global CDN + HTTPS for the Next.js frontend.
- **Firebase Authentication** — Secure login (Google + Email).

## 3. Deep Dive: Agentic AI Implementation

WanderWise follows the **Listen → Route → Execute → Respond** loop across its dual-agent architecture.

1. **Listen**: System receives unstructured input from the user.
2. **Route**: Frontend identifies user intent (e.g., "plan trip" vs "translate").
3. **Execute**: 
    - **Frontend**: Performs quick tasks (Q&A, translations).
    - **Backend**: ADK orchestrates specialized sub-agents to generate a detailed plan.
4. **Respond**: Frontend parses structured JSON and updates the UI (Timeline, Itinerary, etc.).

## 4. Conclusion & Future Work

WanderWise AI demonstrates the power of a dual-agent architecture combining Genkit and ADK. This hybrid design enables rich reasoning while keeping the application scalable and efficient. Future work includes real-time API integrations (flights/weather), user personalization profiles in Firestore, and multi-modal planning using images.
