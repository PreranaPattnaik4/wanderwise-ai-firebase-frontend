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

const prompt = ai.definePrompt({
  name: 'generatePersonalizedItineraryPrompt',
  input: {schema: GeneratePersonalizedItineraryInputSchema},
  output: {schema: GeneratePersonalizedItineraryOutputSchema},
  prompt: `You are an AI travel expert specializing in creating personalized itineraries.

  Based on the user's preferences and constraints, generate a detailed day-by-day itinerary including suggested activities, accommodations, and transportation options.

  Destination: {{{destination}}}
  Trip Type: {{{tripType}}}
  Flight Options: {{{flightOptions}}}
  Description: {{{description}}}
  Budget: {{{budget}}}
  Duration: {{{duration}}} days
  Food Preferences: {{{foodPreferences}}}
  Interests: {{{interests}}}
  Language: {{{language}}}

  Generate a comprehensive and engaging itinerary that caters to the user's specific needs and desires.`,
});

const generatePersonalizedItineraryFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedItineraryFlow',
    inputSchema: GeneratePersonalizedItineraryInputSchema,
    outputSchema: GeneratePersonalizedItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
