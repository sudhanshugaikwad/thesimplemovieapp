'use server';
/**
 * @fileOverview A movie critic AI agent.
 *
 * - getAiCriticReview - A function that handles the movie review generation.
 * - MovieCriticInput - The input type for the getAiCriticReview function.
 * - MovieCriticOutput - The return type for the getAiCriticReview function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const MovieCriticInputSchema = z.object({
  title: z.string().describe('The title of the movie.'),
  plot: z.string().describe('The plot summary of the movie.'),
});
export type MovieCriticInput = z.infer<typeof MovieCriticInputSchema>;

const MovieCriticOutputSchema = z.object({
  review: z.string().describe("The AI critic's review of the movie."),
});
export type MovieCriticOutput = z.infer<typeof MovieCriticOutputSchema>;

export async function getAiCriticReview(input: MovieCriticInput): Promise<MovieCriticOutput> {
  return movieCriticFlow(input);
}

const prompt = ai.definePrompt({
  name: 'movieCriticPrompt',
  input: { schema: MovieCriticInputSchema },
  output: { schema: MovieCriticOutputSchema },
  prompt: `You are a witty, sarcastic, and knowledgeable movie critic.
Your task is to write a short, entertaining review for the movie titled "{{title}}".

Here is the plot summary:
{{plot}}

Based on the title and plot, write a review. Be creative and opinionated. You can be humorous, critical, or praiseworthy, but always maintain your distinct personality. Keep the review to one or two paragraphs.`,
});

const movieCriticFlow = ai.defineFlow(
  {
    name: 'movieCriticFlow',
    inputSchema: MovieCriticInputSchema,
    outputSchema: MovieCriticOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
