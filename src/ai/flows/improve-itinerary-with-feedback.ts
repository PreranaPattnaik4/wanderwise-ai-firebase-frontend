'use server';

/**
 * @fileOverview A flow that improves an itinerary based on user feedback.
 *
 * - improveItineraryWithFeedback - A function that accepts itinerary and feedback and returns improved itinerary.
 * - ImproveItineraryWithFeedbackInput - The input type for the improveItineraryWithFeedback function.
 * - ImproveItineraryWithFeedbackOutput - The return type for the improveItineraryWithFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveItineraryWithFeedbackInputSchema = z.object({
  itinerary: z.string().describe('The current itinerary.'),
  feedback: z.string().describe('The feedback provided by the user.'),
});
export type ImproveItineraryWithFeedbackInput = z.infer<
  typeof ImproveItineraryWithFeedbackInputSchema
>;

const ImproveItineraryWithFeedbackOutputSchema = z.object({
  improvedItinerary: z.string().describe('The improved itinerary.'),
});
export type ImproveItineraryWithFeedbackOutput = z.infer<
  typeof ImproveItineraryWithFeedbackOutputSchema
>;

export async function improveItineraryWithFeedback(
  input: ImproveItineraryWithFeedbackInput
): Promise<ImproveItineraryWithFeedbackOutput> {
  return improveItineraryWithFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveItineraryWithFeedbackPrompt',
  input: {schema: ImproveItineraryWithFeedbackInputSchema},
  output: {schema: ImproveItineraryWithFeedbackOutputSchema},
  prompt: `You are an expert travel planner. You will be given an itinerary and feedback from the user. Use the feedback to improve the itinerary. Return the improved itinerary.

Itinerary: {{{itinerary}}}

Feedback: {{{feedback}}}`,
});

const improveItineraryWithFeedbackFlow = ai.defineFlow(
  {
    name: 'improveItineraryWithFeedbackFlow',
    inputSchema: ImproveItineraryWithFeedbackInputSchema,
    outputSchema: ImproveItineraryWithFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
