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

**Why Next.js**

- Reduces bundle sizes
- Improves SEO
- Enables server-side data fetching and AI actions
- Integrates seamlessly with Firebase Hosting SSR capabilities

### 2.2 Frontend Agentic Layer (Genkit + Gemini Pro)

Genkit is used to implement the client-side agentic workflow.

**Key Components**

- **Genkit Flows** — Modular AI abilities such as:
  - `generatePersonalizedItinerary` (frontend orchestration layer)
  - `answerTravelQuestion`
  - `getLanguageAssistance`
  - `getPackingListSuggestions`
  - `getTravelSafetyInfo`
  - `improveItineraryWithFeedback`
- **Zod Schemas** — Ensure structured input/output for reliable responses.
- **Intent Router** inside `SideAssistant.tsx` — Maps user messages to appropriate flows.
- **Gemini Pro API** — Performs reasoning, language tasks, structured JSON creation, and travel Q&A.

**Frontend Role in System**

- Handles chat-level interactions
- Performs lightweight reasoning tasks
- Routes complex itinerary generation to the backend ADK system
- Maintains UI consistency and structure

### 2.2b Backend Agentic Layer (Google ADK + Gemini 2.5 Flash)

The backend is a full multi-agent intelligence system, separate from the frontend’s Genkit flows. It performs the heavy reasoning required for multi-day itinerary generation.

**Google ADK (Agents Development Kit)**

ADK enables modular, scalable, production-grade multi-agent orchestration.
Your backend implements five specialized agents:

1.  **Host Agent** — Central orchestrator that routes messages
2.  **Simple Itinerary Agent** — Builds day-by-day structure
3.  **Stay Agent** — Suggests hotels and accommodations
4.  **Activities Agent** — Curates activities, sightseeing spots
5.  **Flight Agent** — Handles flight-related queries (simulated)

These agents communicate with each other through ADK’s message-passing framework to produce a cohesive itinerary.

**Gemini 2.5 Flash (Backend Model)**

The backend uses Gemini 2.5 Flash, optimized for:

- Multi-step agent reasoning
- Fast turnaround
- Low latency in Cloud Run
- Structured itinerary generation

This model processes context from all sub-agents to produce the final trip plan.

**FastAPI Integration**

FastAPI acts as the HTTP interface between Genkit (frontend) and ADK (backend).

**Workflow:**

1.  Frontend Genkit flow sends a trip request → FastAPI
2.  FastAPI triggers the ADK host agent
3.  ADK multi-agent pipeline generates itinerary components
4.  FastAPI aggregates results and returns structured JSON
5.  Genkit displays the itinerary to the user

**Deployment on Cloud Run**

The backend (FastAPI + ADK + Gemini 2.5 Flash) is:

- Dockerized
- Deployed via Google Cloud Run
- Auto-scaling
- Fully managed infrastructure

### 2.4. Platform & Services (Firebase)

- **Firebase AI Studio** — End-to-end development environment with AI-assisted coding, deployments, and integrated terminal
- **Firebase Hosting** — Global CDN + HTTPS for the Next.js frontend
- **Firebase Authentication** — Secure login (Google + Email)

## 3. Deep Dive: Agentic AI Implementation

WanderWise follows the **Listen → Route → Execute → Respond** loop across its dual-agent architecture.

### 3.1 Step-by-Step Workflow

**1. Listen — User Input**

User may type:
> “Plan a 3-day cultural trip to Odisha, focused on temples.”

**2. Route — Intent Recognition**

Frontend’s `SideAssistant.tsx` identifies user intent:
- “plan trip” → itinerary generation
- “translate” → language assistance
- “packing” → packing suggestions

**3. Execute — Dual-Agent Execution Path**

**A. Frontend Genkit Layer**
- Validates input with Zod
- Routes complex itinerary generation to backend
- Performs quick tasks like Q&A, translations, safety info

**B. Backend ADK Layer**
- FastAPI forwards the request to ADK
- ADK orchestrates itinerary, stay, flights, activities agents
- Gemini 2.5 Flash reasons over outputs
- Structured itinerary is returned

**4. Respond — UI Update**

Frontend parses structured JSON and updates:
- Itinerary components
- Activities list
- Map/location display
- Travel tips

## 4. Conclusion & Future Work

WanderWise AI demonstrates the power of a dual-agent architecture combining:

- Frontend Genkit + Gemini Pro
- Backend ADK + Gemini 2.5 Flash
- Cloud Run microservices
- Firebase Hosting + AI Studio

This hybrid design enables rich reasoning while keeping the application scalable and efficient.

**Future Enhancements**

- Real-time tools (flight APIs, weather APIs, Maps API)
- Agent Builder integration for full managed orchestration
- Multi-modal itinerary planning using images
- User personalization profiles (Firestore)
- Collaborative travel planning with shared itineraries