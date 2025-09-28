import { config } from 'dotenv';
config();

import '@/ai/flows/generate-personalized-itinerary.ts';
import '@/ai/flows/answer-travel-questions-chatbot.ts';
import '@/ai/flows/improve-itinerary-with-feedback.ts';