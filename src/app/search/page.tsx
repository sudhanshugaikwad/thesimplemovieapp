import { searchMovies } from '@/lib/api';
import { MovieCard, MovieCardSkeleton } from '@/components/MovieCard';
import { Pagination } from '@/components/Pagination';
import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { handleSearch } from '../actions';
import { Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

async function SearchResults({ query, page }: { query: string; page: number }) {
  const moviesData = await searchMovies(query, page);
  const movies = moviesData.Search || [];
  const totalResults = parseInt(moviesData.totalResults || '0', 10);

  if (!query) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Search for anything</h2>
        <p className="text-muted-foreground mt-2">Find your favorite movies and TV series.</p>
      </div>
    );
  }

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
          <h2 className="text-2xl font-semibold">No results found for &quot;{query}&quot;</h2>
          <p className="text-muted-foreground mt-2">Try a different search term.</p>
        </div>
      )}
    </div>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {[...Array(12)].map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams.query || '';
  const page = parseInt(searchParams.page || '1', 10);

  return (
    <main className="container py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 font-headline">Search</h1>
      <form action={handleSearch} className="mb-8 flex gap-2">
        <div className="relative w-full max-w-xl">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            name="query"
            defaultValue={query}
            placeholder="Search for movies, series, and more..."
            className="pl-10 h-12 text-base"
          />
        </div>
        <Button type="submit" size="lg">Search</Button>
      </form>
      <Suspense key={`${query}-${page}`} fallback={<SearchResultsSkeleton />}>
        <SearchResults query={query} page={page} />
      </Suspense>
    </main>
  );
}
