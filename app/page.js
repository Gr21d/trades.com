"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const pathUrl = '/account/sign_in';
    router.push(pathUrl);
  }, [router]);

  return (
    <main>
      <p>Loading...</p>
    </main>
  );
}