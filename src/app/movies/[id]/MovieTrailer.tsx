"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { findMovieTrailer, MovieTrailerInput, MovieTrailerOutput } from '@/ai/flows/movie-trailer-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Film, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MovieTrailer({ title, year }: MovieTrailerInput) {
  const [trailerInfo, setTrailerInfo] = useState<MovieTrailerOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await findMovieTrailer({ title, year });
        setTrailerInfo(result);
      } catch (e) {
        console.error("Failed to find movie trailer:", e);
        setError("The AI trailer finder is having trouble. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [title, year]);

  if (loading) {
    return (
        <div className="space-y-4">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                <Skeleton className="w-full h-full" />
            </AspectRatio>
            <Skeleton className="h-8 w-1/3" />
            <div className="flex items-center space-x-4">
                <Skeleton className="h-36 w-24 rounded-md" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-40" />
                </div>
            </div>
        </div>
    );
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-semibold mb-4 font-headline flex items-center">
                <Film className="mr-2 h-6 w-6 text-primary" />
                Official Trailer
            </h2>
            {trailerInfo?.youtubeVideoId ? (
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerInfo.youtubeVideoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                ></iframe>
                </AspectRatio>
            ) : (
                <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Trailer not available.</p>
                </div>
            )}
        </div>

        {trailerInfo?.recommendation && (
            <div>
                 <h2 className="text-2xl font-semibold mb-4 font-headline flex items-center">
                    <Clapperboard className="mr-2 h-6 w-6 text-primary" />
                    You Might Also Like
                </h2>
                <Card>
                    <CardContent className="pt-6 flex items-start gap-4">
                         <div className="w-24 flex-shrink-0">
                            <AspectRatio ratio={2/3}>
                                <Image 
                                    src={`https://m.media-amazon.com/images/M/MV5BMTA3MDM5MTM2NjNeQTJeQWpwZ15BbWU4MDQzMDM5NzEx._V1_SX300.jpg`}
                                    alt={`Poster for ${trailerInfo.recommendation.title}`}
                                    className="rounded-md object-cover"
                                    fill
                                    data-ai-hint="movie poster"
                                />
                             </AspectRatio>
                         </div>
                         <div className="flex-grow">
                             <h3 className="text-lg font-semibold">{trailerInfo.recommendation.title}</h3>
                             <p className="text-sm text-muted-foreground mt-1 mb-3 line-clamp-3">{trailerInfo.recommendation.plot}</p>
                             <Button asChild variant="secondary" size="sm">
                                <Link href={`/movies/${trailerInfo.recommendation.imdbId}`}>View Details</Link>
                             </Button>
                         </div>
                    </CardContent>
                </Card>
            </div>
        )}
    </div>
  );
}
