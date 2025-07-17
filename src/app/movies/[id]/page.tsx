import React from 'react';
import Image from 'next/image';
import { getMovieById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Star, Share2, Bot, Film, Users, Trophy, Pencil, Clapperboard, MonitorPlay, Tv } from 'lucide-react';
import { FavoriteButton } from '../FavoriteButton';
import { getAiCriticReview } from '@/ai/flows/movie-critic-flow';
import { findMovieTrailer } from '@/ai/flows/movie-trailer-flow';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

async function AiCriticReview({ title, plot }: { title: string; plot: string }) {
    const reviewData = await getAiCriticReview({ title, plot });
    if (!reviewData || !reviewData.review) return null;
    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2 flex items-center"><Bot className="mr-2" /> AI Critic's Take</h3>
            <p className="text-foreground/80 italic">&ldquo;{reviewData.review}&rdquo;</p>
        </div>
    );
}

async function MovieTrailerSection({ title, year }: { title: string, year: string }) {
  const trailerInfo = await findMovieTrailer({ title, year });
  if (!trailerInfo?.youtubeVideoId) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center"><MonitorPlay className="mr-2" /> Trailer</h3>
      <div className="aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerInfo.youtubeVideoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg border-0"
        ></iframe>
      </div>
    </div>
  )
}


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

  const releaseDate = movie.Released !== 'N/A' ? format(new Date(movie.Released), 'dd-MM-yyyy') : 'N/A';

  return (
    <div className="animate-fade-in text-white">
        {/* Backdrop */}
        <div className="relative h-[40vh] md:h-[50vh] w-full">
            <Image
                src={movie.Poster !== "N/A" ? movie.Poster.replace("SX300", "SX1280") : "https://placehold.co/1280x720.png"}
                alt={`Backdrop for ${movie.Title}`}
                fill
                className="object-cover object-top blur-md brightness-50"
                data-ai-hint="movie background"
            />
            <div className="absolute top-0 right-4 p-4">
                <Button variant="ghost" size="icon">
                    <Share2 className="h-6 w-6" />
                </Button>
            </div>
        </div>

        {/* Content */}
        <div className="container -mt-[20vh] relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                {/* Left Column: Poster & Buttons */}
                <div className="flex-shrink-0">
                    <Image
                        src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450.png"}
                        alt={`Poster for ${movie.Title}`}
                        width={300}
                        height={450}
                        className="rounded-lg shadow-2xl w-full"
                        data-ai-hint="movie poster"
                    />
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <FavoriteButton movie={movieForFav} />
                        <Button size="lg"><MonitorPlay className="mr-2 h-5 w-5" /> Trailer</Button>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="pt-[10vh] md:pt-0">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">{movie.Title}</h1>
                    <p className="text-lg text-muted-foreground mt-1">{movie.Type === 'series' ? 'TV Series' : 'Movie'} &bull; {movie.Year}</p>

                    <div className="flex flex-wrap gap-2 my-4">
                        {movie.Genre.split(', ').map(genre => (
                            <Badge key={genre} variant="secondary" className="bg-white/10 text-white border-0">{genre}</Badge>
                        ))}
                    </div>

                    <div className="my-6 p-4 bg-background/50 backdrop-blur-sm rounded-lg flex flex-wrap items-center justify-between gap-4 text-sm">
                        <div className="flex items-center gap-2"><Tv className="w-4 h-4 text-primary" /> Status: {movie.Production !== 'N/A' ? 'Released' : 'Unknown'}</div>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {releaseDate}</div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Runtime: {movie.Runtime}</div>
                        <div className="flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> Score: {movie.imdbRating}</div>
                        <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Vote count: {movie.imdbVotes}</div>
                    </div>

                    <h2 className="text-2xl font-semibold mb-2 font-headline">Plot Summary</h2>
                    <p className="text-foreground/80 leading-relaxed">{movie.Plot}</p>
                </div>
            </div>
            
            <Separator className="my-8 bg-white/10" />

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                  <h3 className="text-xl font-semibold mb-4">Details</h3>
                  <div className="space-y-3 text-sm">
                      <div className="flex"><strong className="w-24 flex-shrink-0 flex items-center"><Clapperboard className="mr-2 h-4 w-4" /> Director</strong> <span className="text-muted-foreground">{movie.Director}</span></div>
                      <div className="flex"><strong className="w-24 flex-shrink-0 flex items-center"><Pencil className="mr-2 h-4 w-4" /> Writer</strong> <span className="text-muted-foreground">{movie.Writer}</span></div>
                      <div className="flex"><strong className="w-24 flex-shrink-0 flex items-center"><Users className="mr-2 h-4 w-4" /> Actors</strong> <span className="text-muted-foreground">{movie.Actors}</span></div>
                      <div className="flex"><strong className="w-24 flex-shrink-0 flex items-center"><Trophy className="mr-2 h-4 w-4" /> Awards</strong> <span className="text-muted-foreground">{movie.Awards}</span></div>
                  </div>
              </div>
               <div>
                  <React.Suspense fallback={<p>Loading AI Critic...</p>}>
                      <AiCriticReview title={movie.Title} plot={movie.Plot} />
                  </React.Suspense>
              </div>
            </div>

            <React.Suspense fallback={<p>Finding trailer...</p>}>
              <MovieTrailerSection title={movie.Title} year={movie.Year} />
            </React.Suspense>
        </div>
    </div>
  );
}
