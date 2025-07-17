'use server';

import { redirect } from 'next/navigation';

export async function handleSearch(formData: FormData) {
  const query = formData.get('query') as string;
  const from = formData.get('from') as string || '/search'; // Default to search page

  if (query) {
    redirect(`${from}?query=${encodeURIComponent(query)}`);
  } else {
    redirect(from);
  }
}
