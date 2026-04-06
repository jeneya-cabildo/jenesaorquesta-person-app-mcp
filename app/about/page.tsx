import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Zap, Database, Rocket, Code2, Shield, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:opacity-10"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            About Person App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A modern, production-ready contact management system built with cutting-edge web technologies
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview Card */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Application Overview</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Person App is a full-stack web application demonstrating professional CRUD operations with a production-grade serverless database. Build, test, and manage person records with a beautiful, modern interface that's optimized for both desktop and mobile devices.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white font-semibold">Modern Frontend</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm ml-9">Next.js 16, React 19, TypeScript, Tailwind CSS</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white font-semibold">Server Actions</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm ml-9">No REST API needed, direct database mutations</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white font-semibold">Neon PostgreSQL</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm ml-9">Serverless, auto-scaling, connection pooling</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Rocket className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white font-semibold">Vercel Deployment</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm ml-9">Edge functions, auto-scaling, CI/CD</p>
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-blue-200/50 dark:border-slate-600/50">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">✨ Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '➕', title: 'Create', desc: 'Add new contacts with all details' },
                { icon: '👁️', title: 'Read', desc: 'View records with timestamps' },
                { icon: '✏️', title: 'Update', desc: 'Edit contact information' },
                { icon: '🗑️', title: 'Delete', desc: 'Remove records safely' },
                { icon: '🔍', title: 'Search', desc: 'Filter by multiple fields' },
                { icon: '📱', title: 'Responsive', desc: 'Mobile-optimized UI' },
              ].map((feature, i) => (
                <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Architecture */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">🏗️ Architecture & Tech Stack</h2>
            
            <div className="space-y-6">
              {/* Stack Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-bold">1</span>
                    Frontend Layer
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Next.js 16 with Turbopack</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> React 19.2 with latest features</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> TypeScript for type safety</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Tailwind CSS + Shadcn UI</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-sm font-bold">2</span>
                    Backend Layer
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Next.js Server Actions</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Prisma ORM v7 (type-safe)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> PG Adapter for pooling</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Zod schema validation</li>
                  </ul>
                </div>

                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-sm font-bold">3</span>
                    Database & Deployment
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Neon PostgreSQL (Serverless)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Connection Pooling for Vercel</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Automatic daily backups</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Auto-scaling with traffic</li>
                  </ul>
                </div>
              </div>

              {/* Data Flow */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-lg border border-gray-200 dark:border-slate-500">
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 space-y-2">
                  <div>User Interface (React)</div>
                  <div className="text-center text-gray-600 dark:text-gray-400">↓</div>
                  <div>Server Actions (TypeScript)</div>
                  <div className="text-center text-gray-600 dark:text-gray-400">↓</div>
                  <div>Prisma ORM (Type-safe)</div>
                  <div className="text-center text-gray-600 dark:text-gray-400">↓</div>
                  <div>PG Adapter (Connection Pool)</div>
                  <div className="text-center text-gray-600 dark:text-gray-400">↓</div>
                  <div className="text-green-600 dark:text-green-400 font-bold">Neon PostgreSQL (Serverless)</div>
                </p>
              </div>
            </div>
          </Card>

          {/* CTA Card */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6 text-blue-50">
              Explore the source code, contribute, or deploy your own instance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                <Link href="/database">View Database Schema</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 border-white/30 text-white border">
                <a href="https://github.com/jeneya-cabildo/jenesaorquesta-person-app" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" /> GitHub Repository
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

