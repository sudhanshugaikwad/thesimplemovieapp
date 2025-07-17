import { Suspense } from 'react';
import { searchMovies } from '@/lib/api';
import { MovieCard, MovieCardSkeleton } from '@/components/MovieCard';
import { Pagination } from '@/components/Pagination';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { redirect } from 'next/navigation';

async function handleSearch(formData: FormData) {
  'use server';
  const query = formData.get('query') as string;
  redirect(`/?query=${encodeURIComponent(query)}`);
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || 'Batman';
  const page = Number(searchParams?.page) || 1;

  const moviesData = await searchMovies(query, page);
  const movies = moviesData.Search || [];
  const totalResults = Number(moviesData.totalResults) || 0;

  return (
    <main className="container py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-2 text-center font-headline">Welcome to CineFile</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">Your ultimate movie guide.</p>

      <div className="flex justify-center mb-8">
        <form action={handleSearch} className="flex-grow max-w-xl flex items-center relative">
          <Input
            type="search"
            name="query"
            placeholder="Search for movies..."
            defaultValue={query}
            className="pl-10 h-12 text-base"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </form>
      </div>

      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <Suspense fallback={[...Array(10)].map((_, i) => <MovieCardSkeleton key={i} />)}>
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </Suspense>
          </div>
          <Pagination totalResults={totalResults} />
        </>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No Movies Found</h2>
          <p className="text-muted-foreground mt-2">Try a different search term.</p>
        </div>
      )}
    </main>
  );
}
