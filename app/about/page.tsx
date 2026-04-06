import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About Person App</h1>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Application Overview</h2>
          <p className="text-gray-700 mb-4">
            Person App is a full-stack web application demonstrating professional CRUD operations with a production-grade database. Build, test, and manage person records with a modern, responsive interface.
          </p>
          <div className="bg-blue-50 p-4 rounded mb-4">
            <h3 className="font-semibold mb-3">Core Technology Stack</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ <strong>Frontend:</strong> Next.js 16, React 19, TypeScript, Tailwind CSS, Shadcn UI</li>
              <li>✅ <strong>Backend:</strong> Next.js Server Actions with TypeScript</li>
              <li>✅ <strong>Database:</strong> Neon PostgreSQL (Serverless) with Prisma ORM v7</li>
              <li>✅ <strong>Deployment:</strong> Vercel with edge functions, auto-scaling & connection pooling</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">✨ Key Features</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>Create</strong> - Add new person records with name, email, phone, address, and bio</li>
            <li><strong>Read</strong> - View all person records with complete details and timestamps</li>
            <li><strong>Update</strong> - Edit existing person information with real-time sync</li>
            <li><strong>Delete</strong> - Remove person records with confirmation</li>
            <li><strong>Search</strong> - Filter by name, email, or phone number</li>
            <li><strong>Responsive</strong> - Fully optimized for desktop and mobile devices</li>
            <li><strong>Production-Ready</strong> - PostgreSQL database with Prisma migrations</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">🏗️ Architecture</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Next.js 16 & Server Actions</h3>
              <p className="text-gray-700">Direct database mutations without REST API, automatic form validation, and optimized performance.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Prisma ORM</h3>
              <p className="text-gray-700">Type-safe database access with automatic schema migrations and intuitive query builder.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Neon PostgreSQL (Serverless)</h3>
              <p className="text-gray-700">Reliable serverless SQL database with ACID transactions, automatic backups, connection pooling, and auto-scaling infrastructure.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded text-sm font-mono mt-4">
            <div>User Interface (React) → Server Actions → Prisma → PostgreSQL</div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-semibold mb-4">📚 Documentation</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="default">
              <Link href="/database">View Database Schema</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://github.com/jeneya-cabildo/jenesaorquesta-person-app" target="_blank">
                <Github className="mr-2 h-4 w-4" /> GitHub Repository
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

