"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import type { Movie } from "@/types"
import { cn } from "@/lib/utils"
import { useFavorites } from "@/hooks/useFavorites"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
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
    <Link href={`/movies/${movie.imdbID}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out border-0 shadow-none bg-transparent h-full flex flex-col">
        <CardContent className="p-0 relative">
          <div className="aspect-[2/3] w-full relative">
            <Image
              src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450.png"}
              alt={`Poster for ${movie.Title}`}
              fill
              className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="movie poster"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <Button 
              size="icon" 
              variant="secondary"
              className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleFavoriteToggle}
              aria-label="Toggle Favorite"
            >
              <Heart className={cn("h-4 w-4", isFav ? "fill-red-500 text-red-500" : "text-primary")} />
            </Button>
          </div>
        </CardContent>
        <div className="pt-3">
          <h3 className="font-semibold text-sm truncate group-hover:text-primary">{movie.Title}</h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <span>{movie.Year}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export function MovieCardSkeleton() {
  return (
    <div className="block">
      <div className="aspect-[2/3] w-full">
         <Skeleton className="w-full h-full" />
      </div>
      <div className="pt-3">
        <Skeleton className="h-5 w-3/4 mb-1" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}
