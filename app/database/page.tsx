import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function DatabasePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Database Schema</h1>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Person Model</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The core data model for the Person App. Each person record stores comprehensive contact and biographical information.
          </p>
          
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <pre>{`model Person {
  id        Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  phone     String?
  address   String?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}</pre>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Field Descriptions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">id</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">Int @id @default(autoincrement())</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Unique primary key, auto-incremented on each new record.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">name</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">String</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Person's full name - required field.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">email</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">String @unique</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Unique email address - required and enforced at database level.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">phone</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">String?</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Optional phone number (? indicates nullable field).</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">address</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">String?</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Optional street address or location.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">bio</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">String?</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Optional biographical information or description.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">createdAt</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">DateTime @default(now())</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Automatic timestamp when record is created.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">updatedAt</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">DateTime @updatedAt</code>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Automatic timestamp updated on every record modification.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Prisma Configuration</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This application uses PostgreSQL as the database provider with Prisma ORM for type-safe database access.
          </p>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <pre>{`datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}`}</pre>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 border-blue-200/50 dark:border-slate-600/50">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Neon PostgreSQL Database</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This application is configured to use <strong>Neon</strong>, a serverless PostgreSQL database platform. Neon provides auto-scaling, connection pooling, and automatic backups without requiring infrastructure management.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Key Neon Features</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li><strong>Serverless:</strong> Automatic scaling with zero downtime</li>
                <li><strong>Connection Pooling:</strong> Built-in pooler endpoint for Vercel deployments</li>
                <li><strong>Auto-Backups:</strong> Automatic daily backups with point-in-time recovery</li>
                <li><strong>Multi-Region:</strong> Deploy across multiple regions for low latency</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Connection Strings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Neon provides two connection endpoints:
              </p>
              <div className="space-y-2">
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                  <div>Direct: postgresql://user:pass@host.neon.tech/dbname</div>
                </div>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                  <div>Pooled: postgresql://user:pass@host-pooler.neon.tech/dbname</div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Use the <code className="bg-gray-100 dark:bg-slate-700 px-1 py-0.5 rounded">pooler</code> endpoint for serverless deployments (Vercel).
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Environment Setup</h3>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                <div>DATABASE_URL="postgresql://user:password@host.neon.tech/dbname"</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
            <li><strong>Type Safety:</strong> Prisma client provides full TypeScript type inference</li>
            <li><strong>Automatic Migrations:</strong> Database schema changes tracked and versioned</li>
            <li><strong>Query Builder:</strong> Intuitive API for complex database operations</li>
            <li><strong>Validation:</strong> Email uniqueness and required fields enforced at database level</li>
            <li><strong>Timestamps:</strong> Automatic tracking of creation and modification times</li>
          </ul>
        </Card>

        <Card className="p-6 bg-green-50 dark:bg-slate-800">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The database is automatically provisioned and ready to use. All CRUD operations are handled through Next.js Server Actions, providing a seamless integration between frontend and database.
          </p>
          <Link href="/" className="text-blue-600 hover:underline font-semibold">
            ← Back to Person Directory
          </Link>
        </Card>
      </div>
    </div>
  );
}
