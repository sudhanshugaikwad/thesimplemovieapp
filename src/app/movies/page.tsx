import { searchMovies } from '@/lib/api';
import { MovieCard, MovieCardSkeleton } from '@/components/MovieCard';
import { Pagination } from '@/components/Pagination';
import { Suspense } from 'react';

async function MovieGrid({ query, page }: { query: string, page: number }) {
  const moviesData = await searchMovies(query, page, 'movie');
  const movies = moviesData.Search || [];
  const totalResults = parseInt(moviesData.totalResults || "0", 10);

  return (
    <div>
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          <Pagination totalResults={totalResults} />
        </>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No movies found</h2>
          <p className="text-muted-foreground mt-2">
            Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
}

function MovieGridSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => <MovieCardSkeleton key={i} />)}
        </div>
    )
}

export default function MoviesPage({ searchParams }: { searchParams: { query?: string, page?: string } }) {
  const query = searchParams.query || 'love';
  const page = parseInt(searchParams.page || "1", 10);
  const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);

  return (
    <main className="container py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 font-headline">
        {capitalizedQuery} Movies
      </h1>
      <Suspense key={`${query}-${page}`} fallback={<MovieGridSkeleton />}>
        <MovieGrid query={query} page={page} />
      </Suspense>
    </main>
  );
}
