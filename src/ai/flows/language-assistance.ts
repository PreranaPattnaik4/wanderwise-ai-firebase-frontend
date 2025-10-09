'use server';

/**
 * @fileOverview A flow to provide language and communication assistance.
 *
 * - getLanguageAssistance - A function that provides translation or etiquette tips.
 * - GetLanguageAssistanceInput - The input type for the getLanguageAssistance function.
 * - GetLanguageAssistanceOutput - The return type for the getLanguageAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetLanguageAssistanceInputSchema = z.object({
  request: z.string().describe('The user\'s request for translation or etiquette tips (e.g., "translate \'hello\' to French", "tipping etiquette in Japan").'),
});
export type GetLanguageAssistanceInput = z.infer<typeof GetLanguageAssistanceInputSchema>;

const GetLanguageAssistanceOutputSchema = z.object({
  response: z.string().describe('The translation or etiquette advice.'),
});
export type GetLanguageAssistanceOutput = z.infer<typeof GetLanguageAssistanceOutputSchema>;

export async function getLanguageAssistance(input: GetLanguageAssistanceInput): Promise<GetLanguageAssistanceOutput> {
  return getLanguageAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getLanguageAssistancePrompt',
  input: {schema: GetLanguageAssistanceInputSchema},
  output: {schema: GetLanguageAssistanceOutputSchema},
  prompt: `You are an AI language and culture expert. Respond to the user's request for translation or etiquette tips.

Request: {{{request}}}

Provide a helpful and accurate response.`,
});

const getLanguageAssistanceFlow = ai.defineFlow(
  {
    name: 'getLanguageAssistanceFlow',
    inputSchema: GetLanguageAssistanceInputSchema,
    outputSchema: GetLanguageAssistanceOutputSchema,
  },
  async input => {
    // In a real app, you might use a dedicated translation API.
    // For now, we'll let the LLM handle it.
    const {output} = await prompt(input);
    return output!;
  }
);
