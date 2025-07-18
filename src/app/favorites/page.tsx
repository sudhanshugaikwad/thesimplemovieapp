"use client"

import { useFavorites } from "@/hooks/useFavorites"
import { MovieCard, MovieCardSkeleton } from "@/components/MovieCard"
import type { Movie } from "@/types"
import { useTranslation } from "@/hooks/useTranslation"

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites()
  const { t } = useTranslation();

  if (loading) {
    return (
        <div className="container py-8">
            <h1 className="text-4xl font-bold mb-8 text-center font-headline">{t('myFavorites')}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {[...Array(8)].map((_, i) => <MovieCardSkeleton key={i} />)}
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
      <h1 className="text-4xl font-bold mb-8 text-center font-headline">{t('myFavorites')}</h1>
      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">{t('noFavoritesYet')}</h2>
          <p className="text-muted-foreground mt-2">
            {t('startExploring')}
          </p>
        </div>
      )}
    </main>
  )
}
