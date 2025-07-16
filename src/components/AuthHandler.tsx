"use client"

import { useEffect } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function AuthHandler() {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      
      if(email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
            toast({
              title: "Successfully signed in!",
              description: `Welcome back, ${result.user.email}`,
            });
            router.push('/');
          })
          .catch((error) => {
            toast({
              title: "Sign in failed",
              description: error.message,
              variant: "destructive",
            });
            router.push('/login');
          });
      }
    }
  }, [router, toast]);

  return null;
}
