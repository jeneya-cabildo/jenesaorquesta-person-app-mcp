'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Copy, CheckCircle2, Zap } from 'lucide-react'
import { useState } from 'react'

export default function MCPSetupPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

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
            MCP Server Setup Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Enable Person CRUD operations in Claude Desktop using our MCP server
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview Card */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">What is the Person MCP Server?</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              The Person MCP Server enables Claude Desktop to perform full CRUD operations on your Person database directly through MCP tools. No API calls needed — Claude can create, read, update, and delete person records with natural language.
            </p>
          </Card>

          {/* Prerequisites */}
          <Card className="p-8 bg-blue-50 dark:bg-slate-800 border-blue-200/50 dark:border-slate-600/50">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Prerequisites</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Claude Desktop</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Latest version installed on your machine</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Node.js 20.9+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">For running the MCP server locally</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">DATABASE_URL</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Neon PostgreSQL connection string (pooled endpoint)</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Installation Steps */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Installation Steps</h2>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="pb-8 border-b border-gray-200 dark:border-slate-600">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold flex-shrink-0">1</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Clone MCP Server Repository</h3>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Get the MCP server code from GitHub:</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto mb-3">
                    <pre>{`git clone https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp.git
cd jenesaorquesta-person-app-mcp`}</pre>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard('git clone https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp.git\ncd jenesaorquesta-person-app-mcp', 'step1')}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied === 'step1' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="pb-8 border-b border-gray-200 dark:border-slate-600">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold flex-shrink-0">2</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Install Dependencies</h3>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Install Node.js dependencies:</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto mb-3">
                    <pre>{`pnpm install`}</pre>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard('pnpm install', 'step2')}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied === 'step2' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="pb-8 border-b border-gray-200 dark:border-slate-600">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold flex-shrink-0">3</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Configure Environment</h3>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Create <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">.env.local</code> with your database URL:</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto mb-3">
                    <pre>{`DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/dbname"`}</pre>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard('DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/dbname"', 'step3')}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied === 'step3' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Step 4 */}
              <div className="pb-8 border-b border-gray-200 dark:border-slate-600">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold flex-shrink-0">4</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add to Claude Desktop Configuration</h3>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Edit your Claude Desktop config file:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <strong>macOS/Linux:</strong> <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">~/.config/Claude/claude_desktop_config.json</code>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <strong>Windows:</strong> <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">%APPDATA%\Claude\claude_desktop_config.json</code>
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3 font-semibold">Add this configuration (replace with your path):</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto mb-3">
                    <pre>{`{
  "mcpServers": {
    "person-app": {
      "command": "node",
      "args": ["/path/to/jenesaorquesta-person-app-mcp/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@host-pooler.neon.tech/dbname"
      }
    }
  }
}`}</pre>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(`{
  "mcpServers": {
    "person-app": {
      "command": "node",
      "args": ["/path/to/jenesaorquesta-person-app-mcp/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@host-pooler.neon.tech/dbname"
      }
    }
  }
}`, 'step4')}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied === 'step4' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Step 5 */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold flex-shrink-0">5</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Restart Claude Desktop</h3>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    Quit and restart Claude Desktop. You should now see the Person App MCP server available in Claude.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Available Tools */}
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 border-purple-200/50 dark:border-slate-600/50">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Available MCP Tools</h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">createPerson</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Create a new person record</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  name (string), email (string), phone? (string), address? (string), bio? (string)
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">readPerson</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Get person records by ID or list all</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  id? (number) — omit to list all persons
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">updatePerson</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Update an existing person record</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  id (number), name? (string), email? (string), phone? (string), address? (string), bio? (string)
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">deletePerson</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Delete a person record by ID</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  id (number)
                </code>
              </div>
            </div>
          </Card>

          {/* Example Usage */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Example Claude Prompts</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  "Create a new person named John Doe with email john@example.com and phone 555-1234"
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  "Show me all people in the database"
                </p>
              </div>

              <div className="border-l-4 border-pink-500 pl-4">
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  "Update person with ID 1 to change their email to newemail@example.com"
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  "Delete the person with ID 5"
                </p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Test?</h2>
            <p className="text-lg mb-6 text-blue-50">
              Try the MCP server in action with our interactive demo
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                <Link href="/mcp/demo">View Demo</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 border-white/30 text-white border">
                <a href="https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp" target="_blank" rel="noopener noreferrer">
                  <Zap className="mr-2 h-5 w-5" /> GitHub Repository
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
