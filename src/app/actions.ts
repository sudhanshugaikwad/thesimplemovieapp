'use server';

import { redirect } from 'next/navigation';

export async function handleSearch(formData: FormData) {
  const query = formData.get('query') as string;
  if (query) {
    redirect(`/?query=${encodeURIComponent(query)}`);
  } else {
    redirect('/');
  }
}
