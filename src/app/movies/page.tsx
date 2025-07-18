import { searchMovies } from '@/lib/api';
import { MovieCard, MovieCardSkeleton } from '@/components/MovieCard';
import { Pagination } from '@/components/Pagination';
import { Suspense } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

async function MovieGrid({ query, page }: { query: string, page: number }) {
  const moviesData = await searchMovies(query, page, 'movie');
  const movies = moviesData.Search || [];
  const totalResults = parseInt(moviesData.totalResults || "0", 10);
  // This is a server component, so we can't use the hook directly.
  // We'll pass the translated string as a prop or handle it on the client.
  // For simplicity, we'll just show a generic message here.
  // A real app might use a server-side i18n library.
  const noMoviesFoundText = "No movies found";
  const tryDifferentSearchText = "Try a different search term.";

  return (
    <div>
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          <Pagination totalResults={totalResults} />
        </>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">{noMoviesFoundText}</h2>
          <p className="text-muted-foreground mt-2">
            {tryDifferentSearchText}
          </p>
        </div>
      )}
    </div>
  );
}

function MovieGridSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {[...Array(16)].map((_, i) => <MovieCardSkeleton key={i} />)}
        </div>
    )
}

// Client component to handle translation for the title
function MoviesPageClient({ query, page }: { query: string, page: number }) {
  const { t } = useTranslation();
  const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);
  const title = t('moviesTitle', { query: capitalizedQuery });

  return (
    <main className="container py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 font-headline">
        {title}
      </h1>
      <Suspense key={`${query}-${page}`} fallback={<MovieGridSkeleton />}>
        <MovieGrid query={query} page={page} />
      </Suspense>
    </main>
  )
}


export default function MoviesPage({ searchParams }: { searchParams: { query?: string, page?: string } }) {
  const query = searchParams.query || 'love';
  const page = parseInt(searchParams.page || "1", 10);

  // This is a server component, so we wrap the client component
  return <MoviesPageClient query={query} page={page} />;
}
