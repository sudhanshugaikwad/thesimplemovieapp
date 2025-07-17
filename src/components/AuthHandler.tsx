"use client"

import { useEffect } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

export function AuthHandler() {
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window !== 'undefined' && isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt(t('promptEmail'));
      }
      
      if(email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
            toast({
              title: t('signInSuccessTitle'),
              description: t('signInSuccessDescription', { email: result.user.email }),
            });
            router.push('/');
          })
          .catch((error) => {
            toast({
              title: t('signInFailedTitle'),
              description: error.message,
              variant: "destructive",
            });
            router.push('/login');
          });
      }
    }
  }, [router, toast, t]);

  return null;
}
