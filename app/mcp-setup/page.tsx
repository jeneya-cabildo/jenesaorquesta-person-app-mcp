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
              The Person MCP Server v2.0 enables Claude Desktop to manage your Person database <strong>and</strong> play dice + card games — all through natural language. 8 tools total.
            </p>
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { label: 'createPerson', color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' },
                { label: 'readPerson', color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' },
                { label: 'searchPerson', color: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200' },
                { label: 'updatePerson', color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' },
                { label: 'deletePerson', color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' },
                { label: 'rollDice', color: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' },
                { label: 'dealPokerHands', color: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200' },
                { label: 'playBlackjack', color: 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200' },
              ].map((tool) => (
                <div key={tool.label} className={`px-3 py-2 rounded-lg text-center font-mono text-sm font-medium ${tool.color}`}>
                  {tool.label}
                </div>
              ))}
            </div>
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
                  <p className="font-semibold text-gray-900 dark:text-white">pnpm</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Package manager — <code className="bg-gray-100 dark:bg-slate-700 px-1 rounded">npm install -g pnpm</code></p>
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Clone the Repository</h3>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Get the MCP server code from GitHub:</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto mb-3">
                    <pre>{`git clone https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp.git
cd jenesaorquesta-person-app-mcp/mcp-server`}</pre>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard('git clone https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp.git\ncd jenesaorquesta-person-app-mcp/mcp-server', 'step1')}
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
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Install Node.js dependencies using pnpm:</p>
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
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Create a <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">.env</code> file inside <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">mcp-server/</code> with your database URL:</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto mb-3">
                    <pre>{`DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/dbname?sslmode=require"`}</pre>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard('DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/dbname?sslmode=require"', 'step3')}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied === 'step3' ? 'Copied!' : 'Copy'}
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    ⚠️ Use the <strong>pooled</strong> connection string from Neon for serverless environments.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="pb-8 border-b border-gray-200 dark:border-slate-600">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold flex-shrink-0">4</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Build the MCP Server</h3>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Compile TypeScript to JavaScript:</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto mb-3">
                    <pre>{`pnpm build`}</pre>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard('pnpm build', 'step4-build')}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied === 'step4-build' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Step 5 */}
              <div className="pb-8 border-b border-gray-200 dark:border-slate-600">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold flex-shrink-0">5</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add to Claude Desktop Configuration</h3>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Edit your Claude Desktop config file:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>macOS/Linux:</strong> <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">~/.config/Claude/claude_desktop_config.json</code>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <strong>Windows:</strong> <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">%APPDATA%\Claude\claude_desktop_config.json</code>
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3 font-semibold">Add this configuration (replace with your actual path and database URL):</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto mb-3">
                    <pre>{`{
  "mcpServers": {
    "person-app": {
      "command": "node",
      "args": [
        "/absolute/path/to/jenesaorquesta-person-app-mcp/mcp-server/dist/index.js"
      ],
      "env": {
        "DATABASE_URL": "postgresql://user:password@host-pooler.neon.tech/dbname?sslmode=require"
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
      "args": [
        "/absolute/path/to/jenesaorquesta-person-app-mcp/mcp-server/dist/index.js"
      ],
      "env": {
        "DATABASE_URL": "postgresql://user:password@host-pooler.neon.tech/dbname?sslmode=require"
      }
    }
  }
}`, 'step5')}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied === 'step5' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Step 6 */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold flex-shrink-0">6</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Restart Claude Desktop</h3>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Quit and restart Claude Desktop completely. You should see a hammer 🔨 icon in the bottom-left of the chat input, indicating MCP tools are available.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click the hammer icon to verify <strong>person-app-mcp</strong> tools (createPerson, readPerson, searchPerson, updatePerson, deletePerson, rollDice, dealPokerHands, playBlackjack) are listed.
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
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-mono font-bold">POST</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">createPerson</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Create a new person record in the database</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  name* (string), email* (string), phone? (string), address? (string), bio? (string)
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-mono font-bold">GET</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">readPerson</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Get a person by ID or list all persons</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  id? (number) — omit to list all persons
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded text-xs font-mono font-bold">GET</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">searchPerson</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Search persons by name, email, or phone (case-insensitive)</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  query* (string)
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs font-mono font-bold">PATCH</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">updatePerson</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Update an existing person record by ID</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  id* (number), name? (string), email? (string), phone? (string), address? (string), bio? (string)
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-xs font-mono font-bold">DELETE</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">deletePerson</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Delete a person record by ID</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  id* (number)
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded text-xs font-mono font-bold">DICE</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">rollDice</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Roll one or more dice (d4, d6, d8, d10, d12, d20, d100…) with optional modifier</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  sides? (number, default 6), count? (number, default 1, max 20), modifier? (number, default 0)
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded text-xs font-mono font-bold">CARDS</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">dealPokerHands</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Shuffle a 52-card deck and deal 5-card hands; evaluates and ranks all players</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  players? (number 1-6, default 4)
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded text-xs font-mono font-bold">CARDS</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">evaluatePokerHand</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Evaluate any 5-card hand — returns name, rank, and description</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  cards* (string) — e.g. &quot;AS KS QS JS 10S&quot;
                </code>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 rounded text-xs font-mono font-bold">CARDS</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">playBlackjack</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Multi-turn Blackjack game with basic strategy advice. Dealer draws to 17.</p>
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                  action* (&quot;deal&quot; | &quot;hit&quot; | &quot;stand&quot;), playerCards? (string), dealerCards? (string)
                </code>
              </div>
            </div>
          </Card>

          {/* Example Usage */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Example Claude Prompts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Once configured, try these natural language prompts in Claude Desktop:</p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 bg-green-50 dark:bg-slate-700 py-3 pr-3 rounded-r">
                <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">CREATE</p>
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  "Create a new person named Alice Johnson with email alice@example.com and phone 555-0001"
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 dark:bg-slate-700 py-3 pr-3 rounded-r">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">READ</p>
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  "Show me all people in the database"
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 dark:bg-slate-700 py-3 pr-3 rounded-r">
                <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-1">UPDATE</p>
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  "Update person with ID 1 to change their email to newemail@example.com"
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-slate-700 py-3 pr-3 rounded-r">
                <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">DELETE</p>
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  &quot;Delete the person with ID 5&quot;
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-4 bg-cyan-50 dark:bg-slate-700 py-3 pr-3 rounded-r">
                <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 mb-1">SEARCH</p>
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  &quot;Find all people named Alice in the database&quot;
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 dark:bg-slate-700 py-3 pr-3 rounded-r">
                <p className="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-1">DICE</p>
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  &quot;Roll a d20 for my attack roll&quot;
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 dark:bg-slate-700 py-3 pr-3 rounded-r">
                <p className="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-1">DICE</p>
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  &quot;Roll 4d6, drop the lowest, and tell me my stat scores&quot;
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4 bg-emerald-50 dark:bg-slate-700 py-3 pr-3 rounded-r">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">POKER</p>
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  &quot;Deal a 4-player poker game and tell me who wins&quot;
                </p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4 bg-rose-50 dark:bg-slate-700 py-3 pr-3 rounded-r">
                <p className="text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1">BLACKJACK</p>
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 italic">
                  &quot;Deal me a blackjack hand&quot;
                </p>
              </div>
            </div>
          </Card>

          {/* Troubleshooting */}
          <Card className="p-8 bg-yellow-50 dark:bg-slate-800 border-yellow-200/50 dark:border-slate-600/50">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Troubleshooting</h2>
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">MCP Server not appearing in Claude</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>1. Verify the file path to <code className="bg-gray-100 dark:bg-slate-600 px-1 rounded">dist/index.js</code> is absolute and correct</li>
                  <li>2. Ensure you ran <code className="bg-gray-100 dark:bg-slate-600 px-1 rounded">pnpm build</code> to generate <code className="bg-gray-100 dark:bg-slate-600 px-1 rounded">dist/</code></li>
                  <li>3. Restart Claude Desktop completely (not just close the window)</li>
                  <li>4. Check Claude Desktop logs for JSON parse errors in the config</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Database connection errors</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>1. Use the <strong>pooled</strong> (not direct) connection string from Neon</li>
                  <li>2. Ensure <code className="bg-gray-100 dark:bg-slate-600 px-1 rounded">?sslmode=require</code> is appended to the URL</li>
                  <li>3. Verify the DATABASE_URL is set in the <code className="bg-gray-100 dark:bg-slate-600 px-1 rounded">env</code> section of the config</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Test?</h2>
            <p className="text-lg mb-6 text-blue-50">
              See the MCP server in action with our interactive demo
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                <Link href="/mcp-demo">View Interactive Demo</Link>
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
