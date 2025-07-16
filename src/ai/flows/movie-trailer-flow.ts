'use server';
/**
 * @fileOverview An AI agent for finding movie trailers.
 *
 * - findMovieTrailer - A function that returns a YouTube video ID for a movie trailer.
 * - MovieTrailerInput - The input type for the findMovieTrailer function.
 * - MovieTrailerOutput - The return type for the findMovieTrailer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const MovieTrailerInputSchema = z.object({
  title: z.string().describe('The title of the movie.'),
  year: z.string().describe('The release year of the movie.'),
});
export type MovieTrailerInput = z.infer<typeof MovieTrailerInputSchema>;

const MovieTrailerOutputSchema = z.object({
  youtubeVideoId: z.string().optional().describe('The YouTube video ID for the official movie trailer.'),
  recommendation: z.object({
    title: z.string().describe('The title of a similar movie.'),
    plot: z.string().describe('A short plot summary of the recommended movie.'),
    imdbId: z.string().describe('The IMDb ID of the recommended movie.'),
  }).describe('A recommendation for a similar movie.'),
});
export type MovieTrailerOutput = z.infer<typeof MovieTrailerOutputSchema>;

export async function findMovieTrailer(input: MovieTrailerInput): Promise<MovieTrailerOutput> {
  return movieTrailerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'movieTrailerPrompt',
  input: { schema: MovieTrailerInputSchema },
  output: { schema: MovieTrailerOutputSchema },
  prompt: `You are a movie expert. Your task is to find the official YouTube trailer for a movie and recommend a similar movie.

Movie Title: "{{title}}"
Movie Year: "{{year}}"

1.  **Find the Trailer**: Find the official YouTube video ID for the movie trailer. If you cannot find an official trailer, leave the 'youtubeVideoId' field empty.
2.  **Recommend a Movie**: Recommend one similar movie. Provide its title, a brief plot summary, and its IMDb ID (including the 'tt' prefix).`,
});

const movieTrailerFlow = ai.defineFlow(
  {
    name: 'movieTrailerFlow',
    inputSchema: MovieTrailerInputSchema,
    outputSchema: MovieTrailerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
