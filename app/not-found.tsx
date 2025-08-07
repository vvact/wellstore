// app/not-found.tsx

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button'; // optional if you're using shadcn/ui

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <p className="mt-2 text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
      <Link href="/" className="mt-6">
        <Button>Go back home</Button>
      </Link>
    </main>
  );
}
