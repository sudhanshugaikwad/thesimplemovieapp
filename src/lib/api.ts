import type { MovieSearchResult, MovieDetails } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || '2edba679';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export async function searchMovies(query: string, page: number = 1): Promise<MovieSearchResult> {
  try {
    const response = await fetch(`${API_URL}&s=${query}&page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to search movies:", error);
    return { Search: [], totalResults: "0", Response: "False", Error: (error as Error).message };
  }
}

export async function getMovieById(id: string): Promise<MovieDetails | null> {
  try {
    const response = await fetch(`${API_URL}&i=${id}&plot=full`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.Response === "False") {
      console.error(data.Error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return null;
  }
}
