"use client"

import { useFavorites } from "@/hooks/useFavorites"
import { MovieCard, MovieCardSkeleton } from "@/components/MovieCard"
import type { Movie } from "@/types"

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites()

  if (loading) {
    return (
        <div className="container py-8">
            <h1 className="text-4xl font-bold mb-8 text-center font-headline">My Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => <MovieCardSkeleton key={i} />)}
            </div>
        </div>
    )
  }
  
  const favoriteMovies: Movie[] = favorites.map(fav => ({
      Title: fav.title,
      Year: fav.year,
      imdbID: fav.movieId,
      Type: 'movie',
      Poster: fav.poster,
  }))

  return (
    <main className="container py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-center font-headline">My Favorites</h1>
      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No Favorites Yet</h2>
          <p className="text-muted-foreground mt-2">
            Start exploring and add some movies to your collection!
          </p>
        </div>
      )}
    </main>
  )
}
