import Link from 'next/link';
import { Users, Github } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ThemeToggle from './theme-toggle';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md dark:bg-slate-950/80 dark:border-slate-800/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <Users className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline-block">Person App</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:hidden">PA</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link href="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-slate-800">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-slate-800">
              About
            </Link>
            <Link href="/database" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-slate-800 hidden sm:inline-block">
              Database
            </Link>
            <Button asChild variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-slate-800">
              <a href="https://github.com/jeneya-cabildo/jenesaorquesta-person-app" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </a>
            </Button>
            <div className="mx-1" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}