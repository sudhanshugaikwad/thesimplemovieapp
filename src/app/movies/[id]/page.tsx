import Image from 'next/image';
import { getMovieById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Star, Film, Calendar, Clock } from 'lucide-react';
import { FavoriteButton } from '../FavoriteButton';

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie = await getMovieById(params.id);

  if (!movie) {
    notFound();
  }
  
  const movieForFav = {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Poster: movie.Poster,
    Year: movie.Year,
    Type: movie.Type
  }

  return (
    <div className="animate-fade-in">
      <div className="relative h-[30vh] md:h-[50vh] w-full">
        <Image
          src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/1280x720.png"}
          alt={`Backdrop for ${movie.Title}`}
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="movie poster"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container -mt-24 md:-mt-48 relative pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Image
              src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450.png"}
              alt={`Poster for ${movie.Title}`}
              width={300}
              height={450}
              className="rounded-lg shadow-2xl w-full"
              data-ai-hint="movie poster"
            />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4 pt-8 md:pt-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{movie.Title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mt-2">
              <span>{movie.Year}</span>
              <span>&bull;</span>
              <span>{movie.Rated}</span>
              <span>&bull;</span>
              <span>{movie.Runtime}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.Genre.split(', ').map(genre => (
                <Badge key={genre} variant="secondary">{genre}</Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-bold">{movie.imdbRating} <span className="text-sm text-muted-foreground">/ 10</span></span>
                </div>
                <FavoriteButton movie={movieForFav} />
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-2 font-headline">Plot Summary</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">{movie.Plot}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-4 bg-card rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Director</h3>
                <p className="text-muted-foreground">{movie.Director}</p>
            </div>
            <div className="p-4 bg-card rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Writer</h3>
                <p className="text-muted-foreground">{movie.Writer}</p>
            </div>
            <div className="p-4 bg-card rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Actors</h3>
                <p className="text-muted-foreground">{movie.Actors}</p>
            </div>
        </div>
      </div>
    </div>
  );
}
