'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'

export default function GitHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:opacity-10"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            GitHub Repositories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Access the source code for Person App and MCP Server
          </p>
        </div>

        <div className="space-y-8">
          {/* Main App Repository */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <Github className="h-8 w-8 text-gray-900 dark:text-white flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Person App</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Main application with CRUD operations and UI</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Production-ready Next.js 16 application with full CRUD operations, dark mode support, and Neon PostgreSQL integration.
            </p>
            
            <div className="space-y-3 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Full CRUD operations for person records</li>
                  <li>• Real-time search and filtering</li>
                  <li>• Dark mode support</li>
                  <li>• Responsive design (mobile & desktop)</li>
                  <li>• Server Actions for database mutations</li>
                </ul>
              </div>
            </div>

            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <a href="https://github.com/jeneya-cabildo/jenesaorquesta-person-app" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </Card>

          {/* MCP Server Repository */}
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 border-purple-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <Github className="h-8 w-8 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Person App MCP Server</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">MCP server for Claude Desktop integration</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Standalone MCP (Model Context Protocol) server that enables AI agents like Claude Desktop to perform Person CRUD operations through natural language.
            </p>
            
            <div className="space-y-3 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">MCP Tools</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• <strong>createPerson</strong> - Create new person records</li>
                  <li>• <strong>readPerson</strong> - Query persons by ID or list all</li>
                  <li>• <strong>updatePerson</strong> - Update existing records</li>
                  <li>• <strong>deletePerson</strong> - Delete person records</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tech Stack</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Node.js 20.9+</li>
                  <li>• @modelcontextprotocol/sdk</li>
                  <li>• Prisma ORM v7</li>
                  <li>• Neon PostgreSQL</li>
                </ul>
              </div>
            </div>

            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <a href="https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </Card>

          {/* Documentation Links */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Documentation</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 px-4 flex flex-col items-start justify-start">
                <Link href="/mcp-setup">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">MCP Setup Guide</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">Configure MCP server in Claude Desktop</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto py-4 px-4 flex flex-col items-start justify-start">
                <Link href="/mcp-demo">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">MCP Demo</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">See CRUD operations in action</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto py-4 px-4 flex flex-col items-start justify-start">
                <Link href="/database">
                  <span className="font-semibold text-green-600 dark:text-green-400">Database Schema</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">Neon PostgreSQL structure and design</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto py-4 px-4 flex flex-col items-start justify-start">
                <Link href="/about">
                  <span className="font-semibold text-pink-600 dark:text-pink-400">Architecture Overview</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">Full tech stack and integration details</span>
                </Link>
              </Button>
            </div>
          </Card>

          {/* Contributing */}
          <Card className="p-8 bg-blue-50 dark:bg-slate-800 border-blue-200/50 dark:border-slate-600/50">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contributing</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Both repositories are open source and welcome contributions! Whether it's bug fixes, feature requests, or documentation improvements, feel free to:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <li>• Fork the repository</li>
              <li>• Create a feature branch</li>
              <li>• Submit a pull request</li>
              <li>• Open issues for bugs or ideas</li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Licensed under MIT. Feel free to use, modify, and distribute.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

