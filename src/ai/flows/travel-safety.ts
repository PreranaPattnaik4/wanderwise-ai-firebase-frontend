'use server';

/**
 * @fileOverview A flow to provide travel safety and alerts.
 *
 * - getTravelSafetyInfo - A function that provides safety information.
 * - GetTravelSafetyInfoInput - The input type for the getTravelSafetyInfo function.
 * - GetTravelSafetyInfoOutput - The return type for the getTravelSafetyInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetTravelSafetyInfoInputSchema = z.object({
  request: z.string().describe('The user\'s request for safety information (e.g., "hospitals near Eiffel Tower", "is it safe to walk at night in Rome?").'),
});
export type GetTravelSafetyInfoInput = z.infer<typeof GetTravelSafetyInfoInputSchema>;

const GetTravelSafetyInfoOutputSchema = z.object({
  response: z.string().describe('The safety information or alerts.'),
});
export type GetTravelSafetyInfoOutput = z.infer<typeof GetTravelSafetyInfoOutputSchema>;

export async function getTravelSafetyInfo(input: GetTravelSafetyInfoInput): Promise<GetTravelSafetyInfoOutput> {
  return getTravelSafetyInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getTravelSafetyInfoPrompt',
  input: {schema: GetTravelSafetyInfoInputSchema},
  output: {schema: GetTravelSafetyInfoOutputSchema},
  prompt: `You are an AI travel safety expert. Respond to the user's request for safety information.

Request: {{{request}}}

Provide a helpful and relevant response.`,
});

const getTravelSafetyInfoFlow = ai.defineFlow(
  {
    name: 'getTravelSafetyInfoFlow',
    inputSchema: GetTravelSafetyInfoInputSchema,
    outputSchema: GetTravelSafetyInfoOutputSchema,
  },
  async input => {
    // In a real app, you could integrate with safety APIs or databases.
    const {output} = await prompt(input);
    return output!;
  }
);
