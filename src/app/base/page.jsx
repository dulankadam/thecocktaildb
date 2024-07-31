'use client';
import '@/styles/globals.css';
import Link from 'next/link';

function Base({ Component, pageProps }) {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/search">Search</Link>
        <Link href="/favorites">Favorites</Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
}

export default Base;
