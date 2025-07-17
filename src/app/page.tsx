import { searchMovies } from '@/lib/api';
import { MovieCard } from '@/components/MovieCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Movie } from '@/types';

async function MovieCarousel({ title, query }: { title: string, query: string }) {
  const moviesData = await searchMovies(query, 1);
  const movies = moviesData.Search || [];

  if (movies.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold font-headline mb-4 px-4 md:px-6">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {movies.map((movie) => (
            <CarouselItem key={movie.imdbID} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-4">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>
    </section>
  )
}

async function HeroCarousel() {
    const moviesData = await searchMovies("fast", 1);
    const heroMovies: Movie[] = (moviesData.Search || []).slice(0, 5).map(m => ({...m, Poster: m.Poster.replace("SX300", "SX1200")}));

    if (heroMovies.length === 0) {
        return <div className="h-[60vh] flex items-center justify-center bg-muted"><p>Could not load featured movies.</p></div>
    }

    return (
      <Carousel 
        className="w-full group"
        opts={{
          loop: true,
        }}
        >
        <CarouselContent>
          {heroMovies.map((movie) => (
            <CarouselItem key={movie.imdbID}>
              <div className="w-full h-[40vh] md:h-[60vh] relative">
                <Image
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/1200x600.png"}
                  alt={`Poster for ${movie.Title}`}
                  fill
                  className="object-cover"
                  data-ai-hint="movie poster"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                  <h1 className="text-3xl md:text-5xl font-bold font-headline mb-4 text-shadow-lg shadow-black/50">{movie.Title}</h1>
                   <Button asChild size="lg">
                        <Link href={`/movies/${movie.imdbID}`}>Watch Now</Link>
                    </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Carousel>
    )
}


export default async function Home() {

  return (
    <main className="animate-fade-in">
        <HeroCarousel />
        <div className="container mx-auto">
            <MovieCarousel title="Now Playing" query="action" />
            <MovieCarousel title="Upcoming Movies" query="sci-fi" />
            <MovieCarousel title="Popular Movies" query="comedy" />
        </div>
    </main>
  );
}
