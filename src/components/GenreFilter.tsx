"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Animation'];

export function GenreFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get('query') || '';

  const handleGenreChange = (genre: string) => {
    if (genre && genre !== "all") {
      router.push(`/?query=${encodeURIComponent(genre)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <Select onValueChange={handleGenreChange} defaultValue={genres.includes(currentGenre) ? currentGenre : ""}>
      <SelectTrigger className="w-full sm:w-[180px] h-12 text-base">
        <SelectValue placeholder="Filter by Genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Genres</SelectItem>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>{genre}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
