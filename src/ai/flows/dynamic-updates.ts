'use server';

/**
 * @fileOverview A flow to get dynamic updates for a trip.
 *
 * - getDynamicUpdates - A function that returns dynamic updates based on user input.
 * - GetDynamicUpdatesInput - The input type for the getDynamicUpdates function.
 * - GetDynamicUpdatesOutput - The return type for the getDynamicUpdates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetDynamicUpdatesInputSchema = z.object({
  request: z.string().describe('The user\'s request for dynamic updates (e.g., "flight status for AA123", "weather in Paris").'),
});
export type GetDynamicUpdatesInput = z.infer<typeof GetDynamicUpdatesInputSchema>;

const GetDynamicUpdatesOutputSchema = z.object({
  response: z.string().describe('The response with the requested dynamic updates.'),
});
export type GetDynamicUpdatesOutput = z.infer<typeof GetDynamicUpdatesOutputSchema>;

export async function getDynamicUpdates(input: GetDynamicUpdatesInput): Promise<GetDynamicUpdatesOutput> {
  return getDynamicUpdatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getDynamicUpdatesPrompt',
  input: {schema: GetDynamicUpdatesInputSchema},
  output: {schema: GetDynamicUpdatesOutputSchema},
  prompt: `You are an AI travel assistant providing real-time updates. Respond to the user's request.

Request: {{{request}}}

Provide a concise and helpful response.`,
});

const getDynamicUpdatesFlow = ai.defineFlow(
  {
    name: 'getDynamicUpdatesFlow',
    inputSchema: GetDynamicUpdatesInputSchema,
    outputSchema: GetDynamicUpdatesOutputSchema,
  },
  async input => {
    // In a real app, you would integrate with APIs for flight status, weather, etc.
    // For now, we'll simulate a response.
    if (input.request.toLowerCase().includes('flight')) {
        return { response: 'Flight AA123 is on time and scheduled to depart at 10:00 AM.' };
    }
    if (input.request.toLowerCase().includes('weather')) {
        return { response: 'The weather in Paris is currently 18°C and sunny.' };
    }
    const {output} = await prompt(input);
    return output!;
  }
);
