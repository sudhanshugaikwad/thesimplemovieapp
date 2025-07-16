"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import type { Movie } from "@/types"
import { cn } from "@/lib/utils"
import { useFavorites } from "@/hooks/useFavorites"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "./ui/skeleton"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const { toast } = useToast()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  
  const isFav = isFavorite(movie.imdbID)

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (isFav) {
      await removeFavorite(movie.imdbID)
      toast({ title: "Removed from favorites." })
    } else {
      await addFavorite(movie)
      toast({ title: "Added to favorites." })
    }
  }

  return (
    <Link href={`/movies/${movie.imdbID}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 h-full flex flex-col">
        <CardHeader className="p-0 relative">
          <Image
            src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x445.png"}
            alt={`Poster for ${movie.Title}`}
            width={300}
            height={445}
            className="w-full h-auto object-cover"
            data-ai-hint="movie poster"
          />
           <Button 
            size="icon" 
            variant="secondary"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleFavoriteToggle}
            aria-label="Toggle Favorite"
          >
            <Heart className={cn("h-4 w-4", isFav ? "fill-red-500 text-red-500" : "text-primary")} />
          </Button>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg leading-tight group-hover:text-primary">{movie.Title}</CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{movie.Year}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Skeleton className="h-[445px] w-full" />
      <CardContent className="p-4 flex-grow">
         <Skeleton className="h-6 w-3/4" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-4 w-1/4" />
      </CardFooter>
    </Card>
  )
}
