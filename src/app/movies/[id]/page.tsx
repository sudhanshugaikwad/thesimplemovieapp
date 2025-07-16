import Image from 'next/image';
import { getMovieById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { FavoriteButton } from '../FavoriteButton';
import { AiCriticReview } from './AiCriticReview';
import { Separator } from '@/components/ui/separator';
import { MovieTrailer } from './MovieTrailer';

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie = await getMovieById(params.id);

  if (!movie || movie.Response === "False") {
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
    <div className="container py-12 animate-fade-in">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="md:col-span-1">
                 <Image
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450.png"}
                    alt={`Poster for ${movie.Title}`}
                    width={300}
                    height={450}
                    className="rounded-lg shadow-2xl w-full sticky top-24"
                    data-ai-hint="movie poster"
                />
            </div>

            <div className="md:col-span-2 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">{movie.Title}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <span>{movie.Year}</span>
                        <span>&bull;</span>
                        <span>{movie.Rated}</span>
                        <span>&bull;</span>
                        <span>{movie.Runtime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {movie.Genre.split(', ').map(genre => (
                            <Badge key={genre} variant="secondary">{genre}</Badge>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                        <span className="text-xl font-bold">{movie.imdbRating} <span className="text-sm text-muted-foreground">/ 10</span></span>
                    </div>
                    <FavoriteButton movie={movieForFav} />
                </div>
                
                <Separator />
                
                <MovieTrailer title={movie.Title} year={movie.Year} />

                <Separator />

                <div>
                    <h2 className="text-2xl font-semibold mb-2 font-headline">Plot Summary</h2>
                    <p className="text-lg text-foreground/80 leading-relaxed">{movie.Plot}</p>
                </div>

                <Separator />
                
                <AiCriticReview title={movie.Title} plot={movie.Plot} />
                
                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                    <div>
                        <h3 className="font-semibold text-base mb-1">Director</h3>
                        <p className="text-muted-foreground">{movie.Director}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-base mb-1">Writer</h3>
                        <p className="text-muted-foreground">{movie.Writer}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-base mb-1">Actors</h3>
                        <p className="text-muted-foreground">{movie.Actors}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
