"use client";

import { useState, useEffect } from 'react';
import { getAiCriticReview, MovieCriticInput } from '@/ai/flows/movie-critic-flow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot } from 'lucide-react';

export function AiCriticReview({ title, plot }: MovieCriticInput) {
  const [review, setReview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getAiCriticReview({ title, plot });
        setReview(result.review);
      } catch (e) {
        console.error("Failed to get AI critic review:", e);
        setError("The AI critic is unavailable at the moment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [title, plot]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 font-headline flex items-center">
        <Bot className="mr-2 h-6 w-6 text-primary" />
        AI Critic's Take
      </h2>
      <Card>
        <CardContent className="pt-6">
          {loading && (
             <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
             </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {!loading && !error && (
            <p className="text-foreground/80 leading-relaxed italic">
              &ldquo;{review}&rdquo;
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
