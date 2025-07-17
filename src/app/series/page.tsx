import { searchMovies } from '@/lib/api';
import { MovieCard, MovieCardSkeleton } from '@/components/MovieCard';
import { Pagination } from '@/components/Pagination';
import { Suspense } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

async function SeriesGrid({ query, page }: { query: string, page: number }) {
  const seriesData = await searchMovies(query, page, 'series');
  const series = seriesData.Search || [];
  const totalResults = parseInt(seriesData.totalResults || "0", 10);
  // This is a server component, so we can't use the hook directly.
  // A real app would use a server-side i18n library.
  const noSeriesFoundText = "No TV series found";
  const tryDifferentSearchText = "Try a different search term.";

  return (
    <div>
      {series.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {series.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          <Pagination totalResults={totalResults} />
        </>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">{noSeriesFoundText}</h2>
          <p className="text-muted-foreground mt-2">
            {tryDifferentSearchText}
          </p>
        </div>
      )}
    </div>
  );
}

function SeriesGridSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => <MovieCardSkeleton key={i} />)}
        </div>
    )
}

function SeriesPageClient({ query, page }: { query: string, page: number }) {
    const { t } = useTranslation();
    const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);
    const title = t('seriesTitle', { query: capitalizedQuery });

    return (
        <main className="container py-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-8 font-headline">
            {title}
        </h1>
        <Suspense key={`${query}-${page}`} fallback={<SeriesGridSkeleton />}>
            <SeriesGrid query={query} page={page} />
        </Suspense>
        </main>
    );
}

export default function SeriesPage({ searchParams }: { searchParams: { query?: string, page?: string } }) {
  const query = searchParams.query || 'friends';
  const page = parseInt(searchParams.page || "1", 10);
  
  return <SeriesPageClient query={query} page={page} />;
}
