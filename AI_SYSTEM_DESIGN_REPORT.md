# 🧠 WanderWise AI: Agentic System Design Report

**Project:** WanderWise AI  
**Focus:** Dual-Layer Agentic AI Architecture & Reasoning  
**Date:** July 26, 2024

---

## 1. Introduction: Beyond the Chatbot

WanderWise AI is engineered as a true **agentic system**. Unlike standard chatbots, it is capable of understanding high-level goals, reasoning through multi-step workflows, and utilizing specialized tools to execute complex plans. The system employs a **Dual-Layer Agentic Architecture**, separating lightweight conversational intelligence from deep, resource-intensive planning.

---

## 2. Dual-Layer Agentic Architecture

The core of WanderWise AI is a hierarchy of specialized agents that coordinate to fulfill user requests.

### 2.1 Layer 1: The Conversational Agent (Genkit + Gemini Pro)
This frontend layer acts as the primary interface. It is responsible for:
- **Intent Recognition**: Analyzing user messages to route them to the correct capability.
- **Lightweight Reasoning**: Handling single-shot tasks like answering travel questions, generating packing lists, or translating phrases.
- **Orchestration**: Managing the communication with the Layer 2 backend for complex planning.

### 2.2 Layer 2: The Multi-Agent Planner (Google ADK + Gemini 2.5 Flash)
For complex tasks like itinerary generation, the system delegates to a backend multi-agent pipeline. This pipeline uses **Google ADK** to orchestrate five specialized agents:
- **Host Agent**: The central controller that manages the workflow.
- **Itinerary Agent**: Establishes the temporal structure of the trip.
- **Stay Agent**: Focuses on accommodations and hotel selection.
- **Activities Agent**: Curates sightseeing, dining, and adventure spots.
- **Flight Agent**: Simulates flight searches and logistics.

---

## 3. The Core Agentic Loop: Listen, Route, Execute, Respond

Every user interaction triggers a continuous loop that ensures accuracy and structural integrity.

1.  **Listen (Input Processing)**: The system receives unstructured natural language input.
2.  **Route (Intent Mapping)**: A router identifies the intent (e.g., `PLAN_TRIP`, `ASK_QUESTION`, `TRANSLATE`).
3.  **Execute (Dual-Layer Coordination)**:
    *   Simple intents are executed locally via Genkit flows.
    *   Complex intents trigger the FastAPI-ADK pipeline on Cloud Run.
4.  **Respond (Structured Rendering)**: Zod schemas ensure the data returned (whether from Genkit or ADK) matches the UI's expectations, enabling a reliable, interactive component display.

---

## 4. Architectural Synergy: The Google AI Stack

This agentic design is made possible by the seamless integration of Google's state-of-the-art AI tooling:

*   **Gemini 1.5 Pro & 2.5 Flash**: Provide the reasoning backbone, offering high-level understanding and fast, structured generation.
*   **Genkit**: Formalizes the frontend AI flows, providing a robust framework for multimodal interactions and tool calling.
*   **Google ADK (Agents Development Kit)**: Powers the sophisticated multi-agent reasoning on the backend, allowing for modular and scalable intelligence.
*   **Firebase AI Studio**: Accelerates development with an integrated environment optimized for AI-first applications.
*   **Google Cloud Run**: Provides a scalable, serverless environment for the backend reasoning microservices.

---

## 5. Conclusion

WanderWise AI demonstrates a sophisticated evolution of travel assistance. By leveraging a dual-layer architecture and specialized multi-agent orchestration, it moves beyond simple prompting to provide a reliable, scalable, and genuinely intelligent planning companion.
