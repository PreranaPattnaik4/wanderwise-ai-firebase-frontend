# WanderWise AI – Firebase Frontend

WanderWise AI is an Agentic AI Travel Assistant built using Firebase AI Studio, Gemini Pro, and Next.js.  
It helps users plan personalized trips, create itineraries, access real-time travel insights, and interact through a multilingual voice-based interface.

Live Project URL  
https://studio--studio-1458724225-21a14.us-central1.hosted.app/

Overview
This frontend application is developed and deployed using Firebase AI Studio with integrated Gemini AI for conversational and itinerary planning features.  
It is part of the WanderWise AI ecosystem that enables intelligent trip planning experiences through an Agentic AI interface.

Features
1. Intelligent travel plan generation using Gemini Pro  
2. Voice-to-text and text-to-speech interaction  
3. Real-time travel updates from connected APIs  
4. Multilingual interface support  
5. Integrated chatbot assistant built with Firebase Studio  
6. Firebase-hosted frontend with version control on GitHub  

Built With Firebase AI Studio and Gemini

This entire frontend was created, edited, and deployed using Firebase AI Studio, Google’s AI-powered development environment.
Gemini was used within Firebase Studio to assist with UI design, code suggestions, and integration setup for the travel assistant.
The app uses Gemini Pro for its agentic conversational logic, itinerary generation, and dynamic response handling.

Firebase AI Studio features such as real-time AI-assisted editing, GitHub source control, and instant deployment helped accelerate development and ensure a smooth workflow for the WanderWise AI frontend.

ech Stack

Frontend Framework: Next.js
Language: TypeScript
AI Integration: Gemini Pro via Firebase AI Studio
AI Framework: Genkit (Google’s AI agent framework)
Backend: Firebase Functions and Firestore
Hosting: Firebase App Hosting (Firebase Hosting)
Authentication: Firebase Authentication
Version Control: Git and GitHub
Design: Tailwind CSS with WanderWise green and beige theme

Folder Structure
wanderwise-ai-firebase-frontend/  
├── src/  
│   ├── ai/ – AI agent logic  
│   ├── app/ – Main Next.js pages  
│   ├── components/  
│   │   ├── layout/ – Navbar, Footer  
│   │   ├── ui/ – General UI elements  
│   │   └── wanderwise/ – Chatbot and travel assistant modules  
├── public/ – Static assets  
├── docs/ – Documentation files  
├── firebase.json – Firebase configuration  
├── package.json – Node project config  
├── next.config.ts – Next.js settings  
├── postcss.config.mjs – CSS build settings  
├── .gitignore – Git ignore rules  
├── LICENSE – MIT License  
└── README.md – Project documentation

Setup Instructions
1. Clone the repository  
   git clone https://github.com/PreranaPattnaik4/wanderwise-ai-firebase-frontend.git  
2. Go to the project folder  
   cd wanderwise-ai-firebase-frontend  
3. Install dependencies  
   npm install  
4. Run the app locally  
   npm run dev  

The app will be available at http://localhost:3000  

Contribution Guidelines
1. Fork this repository  
2. Create a new branch for your feature or fix  
3. Commit your changes with clear messages  
4. Push your branch and open a pull request  

Contributions from students and open-source participants (GSSoC, SSoC, etc.) are welcome.

License
Licensed under the MIT License.
