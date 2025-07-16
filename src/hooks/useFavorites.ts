"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./useAuth";
import type { FavoriteMovie, Movie } from "@/types";

export function useFavorites() {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const q = query(collection(db, "favorites"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const userFavorites = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as (FavoriteMovie & {id: string})[];
        setFavorites(userFavorites);
        setFavoriteIds(new Set(userFavorites.map(fav => fav.movieId)));
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setFavorites([]);
      setFavoriteIds(new Set());
      setLoading(false);
    }
  }, [user]);

  const addFavorite = useCallback(async (movie: Movie) => {
    if (user && !favoriteIds.has(movie.imdbID)) {
      await addDoc(collection(db, "favorites"), {
        userId: user.uid,
        movieId: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        year: movie.Year,
      });
    }
  }, [user, favoriteIds]);

  const removeFavorite = useCallback(async (movieId: string) => {
    if (user && favoriteIds.has(movieId)) {
      const q = query(collection(db, "favorites"), where("userId", "==", user.uid), where("movieId", "==", movieId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "favorites", document.id));
      });
    }
  }, [user, favoriteIds]);

  const isFavorite = useCallback((movieId: string) => {
    return favoriteIds.has(movieId);
  }, [favoriteIds]);

  return { favorites, loading, addFavorite, removeFavorite, isFavorite };
}
