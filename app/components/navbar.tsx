import Link from 'next/link';
import { Users, Moon, Sun, Github, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ThemeToggle from './theme-toggle';

export default function Navbar() {
  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Users className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="ml-2 text-lg font-semibold text-foreground">Person App</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link href="/" className="text-foreground hover:text-primary px-2 sm:px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary px-2 sm:px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link href="/database" className="text-foreground hover:text-primary px-2 sm:px-3 py-2 rounded-md text-sm font-medium hidden sm:inline-block">
              Database
            </Link>
            <a href="https://github.com/jeneya-cabildo/week3-jenesaorquesta" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary px-2 sm:px-3 py-2 rounded-md text-sm font-medium">
              <Github className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}