// src/ai/flows/generate-personalized-itinerary.ts
'use server';

/**
 * @fileOverview Generates a personalized travel itinerary based on user preferences.
 *
 * - generatePersonalizedItinerary - A function that generates a personalized itinerary.
 * - GeneratePersonalizedItineraryInput - The input type for the generatePersonalizedItinerary function.
 * - GeneratePersonalizedItineraryOutput - The return type for the generatePersonalizedItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedItineraryInputSchema = z.object({
  destination: z.string().describe('The destination for the trip.'),
  tripType: z.string().describe('The type of trip (e.g., Leisure, Adventure, Business, Family, Romance).'),
  flightOptions: z.string().describe('Flight preferences (e.g., Non-stop, 1 stop ok, Economy, Premium, Business).'),
  description: z.string().describe('A description of the desired trip, including preferences and constraints.'),
  budget: z.string().describe('The budget for the trip.'),
  duration: z.string().describe('The duration of the trip in days.'),
  foodPreferences: z.string().describe('Food preferences and dietary restrictions.'),
  interests: z.string().describe('Interests and activities desired during the trip.'),
  language: z.string().describe('Preferred language for communication.'),
});

export type GeneratePersonalizedItineraryInput = z.infer<typeof GeneratePersonalizedItineraryInputSchema>;

const GeneratePersonalizedItineraryOutputSchema = z.object({
  itinerary: z.string().describe('A detailed day-by-day itinerary with suggested activities, accommodations, and transportation options.'),
});

export type GeneratePersonalizedItineraryOutput = z.infer<typeof GeneratePersonalizedItineraryOutputSchema>;

export async function generatePersonalizedItinerary(
  input: GeneratePersonalizedItineraryInput
): Promise<GeneratePersonalizedItineraryOutput> {
  return generatePersonalizedItineraryFlow(input);
}

const generatePersonalizedItineraryFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedItineraryFlow',
    inputSchema: GeneratePersonalizedItineraryInputSchema,
    outputSchema: GeneratePersonalizedItineraryOutputSchema,
  },
  async input => {
    const backendUrl = process.env.WANDERWISE_BACKEND_URL || 'http://127.0.0.1:8000';

    // The user did not provide a source, so I'm using a placeholder.
    // The user also did not specify what to use for budget type, so I am using tripType.
    const response = await fetch(`${backendUrl}/itinerary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            source: 'delhi', // Placeholder as per user's example, not in original input
            destination: input.destination,
            days: parseInt(input.duration) || 3,
            budget: input.tripType.split(',')[0].toLowerCase().trim(),
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const itineraryData = await response.json();

    // Convert JSON object to a nicely formatted string
    let formattedItinerary = `Trip to ${itineraryData.destination} for ${itineraryData.days} days.\n\n`;
    for (const day in itineraryData.itinerary) {
        formattedItinerary += `${day}:\n`;
        itineraryData.itinerary[day].forEach((activity: string) => {
            formattedItinerary += `- ${activity}\n`;
        });
        formattedItinerary += '\n';
    }

    return { itinerary: formattedItinerary };
  }
);
