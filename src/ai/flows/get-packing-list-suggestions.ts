'use server';

/**
 * @fileOverview A flow to generate packing list suggestions.
 *
 * - getPackingListSuggestions - A function that returns packing list suggestions based on an itinerary and user preferences.
 * - GetPackingListSuggestionsInput - The input type for the getPackingListSuggestions function.
 * - GetPackingListSuggestionsOutput - The return type for the getPackingListSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPackingListSuggestionsInputSchema = z.object({
  itinerary: z.string().describe('The travel itinerary.'),
  preferences: z.string().describe('User preferences for the trip (e.g., lightweight travel, photography gear).'),
});
export type GetPackingListSuggestionsInput = z.infer<typeof GetPackingListSuggestionsInputSchema>;

const GetPackingListSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of packing suggestions.'),
});
export type GetPackingListSuggestionsOutput = z.infer<typeof GetPackingListSuggestionsOutputSchema>;

export async function getPackingListSuggestions(input: GetPackingListSuggestionsInput): Promise<GetPackingListSuggestionsOutput> {
  return getPackingListSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getPackingListSuggestionsPrompt',
  input: {schema: GetPackingListSuggestionsInputSchema},
  output: {schema: GetPackingListSuggestionsOutputSchema},
  prompt: `You are an expert travel planner and packing assistant. Based on the following itinerary and user preferences, generate a list of packing suggestions.

Itinerary:
{{{itinerary}}}

User Preferences:
{{{preferences}}}

Provide a concise list of essential items to pack.`,
});

const getPackingListSuggestionsFlow = ai.defineFlow(
  {
    name: 'getPackingListSuggestionsFlow',
    inputSchema: GetPackingListSuggestionsInputSchema,
    outputSchema: GetPackingListSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
