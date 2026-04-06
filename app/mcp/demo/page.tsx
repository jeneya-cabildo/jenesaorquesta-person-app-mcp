'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function MCPDemoPage() {
  const [demoStep, setDemoStep] = useState(0)
  const [isSetup, setIsSetup] = useState(false)

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
            MCP Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See the Person MCP Server in action with Claude Desktop
          </p>
        </div>

        <div className="space-y-8">
          {/* Setup Status */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Setup Status</h2>
              {isSetup ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="font-semibold">Configured</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                  <AlertCircle className="h-6 w-6" />
                  <span className="font-semibold">Pending Setup</span>
                </div>
              )}
            </div>
            
            {!isSetup && (
              <div className="bg-yellow-50 dark:bg-slate-700 border border-yellow-200 dark:border-yellow-600 rounded p-4 mb-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  To test the MCP server, follow the <Link href="/mcp/setup" className="font-bold underline">setup instructions</Link> to configure the Person App MCP server in Claude Desktop.
                </p>
              </div>
            )}

            <Button 
              onClick={() => setIsSetup(!isSetup)}
              variant={isSetup ? "outline" : "default"}
              className="w-full"
            >
              {isSetup ? 'Mark as Not Configured' : 'Mark as Configured'}
            </Button>
          </Card>

          {/* Demo Workflow */}
          <Card className="p-8 bg-blue-50 dark:bg-slate-800 border-blue-200/50 dark:border-slate-600/50">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Interactive Demo Workflow</h2>
            
            <div className="space-y-6">
              {/* Demo Step 1 */}
              <div className={`p-6 rounded-lg border-2 transition-all ${demoStep >= 0 ? 'border-blue-500 bg-white dark:bg-slate-700' : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold flex-shrink-0 ${demoStep >= 0 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>1</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create a Person</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Ask Claude: "Create a new person named Alice Johnson, email alice@example.com, phone 555-0001, bio: Senior Developer"
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-3 overflow-x-auto">
                      <div className="text-gray-500">Claude calls:</div>
                      <div>{`createPerson({`}</div>
                      <div className="ml-2">{`name: "Alice Johnson",`}</div>
                      <div className="ml-2">{`email: "alice@example.com",`}</div>
                      <div className="ml-2">{`phone: "555-0001",`}</div>
                      <div className="ml-2">{`bio: "Senior Developer"`}</div>
                      <div>{`})`}</div>
                    </div>
                    <Button 
                      onClick={() => setDemoStep(1)}
                      disabled={demoStep < 0}
                      variant={demoStep >= 1 ? "outline" : "default"}
                      size="sm"
                    >
                      {demoStep >= 1 ? '✓ Complete' : 'Try This'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Demo Step 2 */}
              <div className={`p-6 rounded-lg border-2 transition-all ${demoStep >= 1 ? 'border-purple-500 bg-white dark:bg-slate-700' : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 opacity-50'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold flex-shrink-0 ${demoStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'}`}>2</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Read All Persons</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Ask Claude: "Show me all people in the database"
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-3 overflow-x-auto">
                      <div className="text-gray-500">Claude calls:</div>
                      <div>{`readPerson()`}</div>
                    </div>
                    <Button 
                      onClick={() => setDemoStep(2)}
                      disabled={demoStep < 1}
                      variant={demoStep >= 2 ? "outline" : "default"}
                      size="sm"
                    >
                      {demoStep >= 2 ? '✓ Complete' : 'Try This'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Demo Step 3 */}
              <div className={`p-6 rounded-lg border-2 transition-all ${demoStep >= 2 ? 'border-pink-500 bg-white dark:bg-slate-700' : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 opacity-50'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold flex-shrink-0 ${demoStep >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-300 text-gray-600'}`}>3</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Update a Person</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Ask Claude: "Update person ID 1 to have bio: Principal Engineer with 10+ years experience"
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-3 overflow-x-auto">
                      <div className="text-gray-500">Claude calls:</div>
                      <div>{`updatePerson({`}</div>
                      <div className="ml-2">{`id: 1,`}</div>
                      <div className="ml-2">{`bio: "Principal Engineer with 10+ years experience"`}</div>
                      <div>{`})`}</div>
                    </div>
                    <Button 
                      onClick={() => setDemoStep(3)}
                      disabled={demoStep < 2}
                      variant={demoStep >= 3 ? "outline" : "default"}
                      size="sm"
                    >
                      {demoStep >= 3 ? '✓ Complete' : 'Try This'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Demo Step 4 */}
              <div className={`p-6 rounded-lg border-2 transition-all ${demoStep >= 3 ? 'border-red-500 bg-white dark:bg-slate-700' : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 opacity-50'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold flex-shrink-0 ${demoStep >= 3 ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-600'}`}>4</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Delete a Person</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Ask Claude: "Delete person with ID 2"
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-3 overflow-x-auto">
                      <div className="text-gray-500">Claude calls:</div>
                      <div>{`deletePerson({ id: 2 })`}</div>
                    </div>
                    <Button 
                      onClick={() => setDemoStep(4)}
                      disabled={demoStep < 3}
                      variant={demoStep >= 4 ? "outline" : "default"}
                      size="sm"
                    >
                      {demoStep >= 4 ? '✓ Complete' : 'Try This'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {demoStep >= 4 && (
              <div className="mt-8 p-6 bg-green-50 dark:bg-slate-700 border border-green-200 dark:border-green-600 rounded">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">Demo Complete!</h3>
                <p className="text-green-700 dark:text-green-300">
                  You've successfully tested all CRUD operations through the MCP server. The Person App MCP server is working perfectly!
                </p>
              </div>
            )}
          </Card>

          {/* Architecture Diagram */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">MCP Architecture</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto">
              <pre>{`┌─────────────────────────────────────────┐
│       Claude Desktop                    │
│     (with MCP Client)                   │
└──────────────────┬──────────────────────┘
                   │
                   │ MCP Protocol
                   ▼
┌─────────────────────────────────────────┐
│   Person App MCP Server                 │
│  (Node.js + @modelcontextprotocol/sdk)  │
│                                         │
│  Tools:                                 │
│  - createPerson                         │
│  - readPerson                           │
│  - updatePerson                         │
│  - deletePerson                         │
└──────────────────┬──────────────────────┘
                   │
                   │ Prisma ORM
                   ▼
┌─────────────────────────────────────────┐
│    Neon PostgreSQL Database             │
│  (Serverless, Auto-scaling)             │
└─────────────────────────────────────────┘`}</pre>
            </div>
          </Card>

          {/* Troubleshooting */}
          <Card className="p-8 bg-yellow-50 dark:bg-slate-800 border-yellow-200/50 dark:border-slate-600/50">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Troubleshooting</h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">MCP Server not appearing in Claude</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1. Check that the server is running<br/>
                  2. Verify the config file path is correct<br/>
                  3. Restart Claude Desktop completely<br/>
                  4. Check the Claude Desktop logs for errors
                </p>
              </div>

              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Database connection errors</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1. Verify DATABASE_URL is set correctly<br/>
                  2. Use the pooled endpoint for serverless<br/>
                  3. Check network connectivity to Neon<br/>
                  4. Ensure the database exists and is accessible
                </p>
              </div>

              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tool execution fails</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1. Check Claude's error message<br/>
                  2. Verify the MCP server is running<br/>
                  3. Review the server logs<br/>
                  4. Ensure Prisma migrations are up to date
                </p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Next Steps</h2>
            <p className="text-lg mb-6 text-blue-50">
              Full setup instructions and server deployment guide
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                <Link href="/mcp/setup">View Setup Guide</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 border-white/30 text-white border">
                <Link href="/database">Database Schema</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
