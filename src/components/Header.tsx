"use client"

import { BookMarked } from 'lucide-react';

export function Header() {
  return (
    <header className="py-6 mb-8 bg-primary shadow-md">
      <div className="container mx-auto flex items-center justify-center">
        <BookMarked className="h-10 w-10 mr-3 text-primary-foreground" />
        <h1 className="text-4xl font-headline font-bold text-primary-foreground">
          ContAI Ledger
        </h1>
      </div>
    </header>
  );
}
