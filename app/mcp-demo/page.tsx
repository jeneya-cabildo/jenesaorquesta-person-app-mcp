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
            See Person CRUD, dice rolling, and card games via Claude Desktop — all powered by MCP
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
                  To test the MCP server, follow the <Link href="/mcp-setup" className="font-bold underline">setup instructions</Link> to configure the Person App MCP server in Claude Desktop.
                </p>
              </div>
            )}

            <Button 
              onClick={() => setIsSetup(!isSetup)}
              variant={isSetup ? "outline" : "default"}
              className="w-full"
            >
              {isSetup ? 'Mark as Not Configured' : 'I have configured the MCP server ✓'}
            </Button>
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
                   │ MCP Protocol (stdio)
                   ▼
┌─────────────────────────────────────────┐
│   Person App MCP Server  v2.0.0         │
│  (Node.js + @modelcontextprotocol/sdk)  │
│                                         │
│  Person CRUD (5 tools):                 │
│  ✓ createPerson  ✓ readPerson           │
│  ✓ updatePerson  ✓ deletePerson         │
│  ✓ searchPerson                         │
│                                         │
│  Dice & Cards (3 tools):                │
│  ✓ rollDice      ✓ dealPokerHands       │
│  ✓ evaluatePokerHand  ✓ playBlackjack   │
└──────────────────┬──────────────────────┘
                   │
                   │ Prisma ORM v7
                   ▼
┌─────────────────────────────────────────┐
│    Neon PostgreSQL Database             │
│  (Serverless, Auto-scaling)             │
│  Same DB as the Person App UI           │
└─────────────────────────────────────────┘`}</pre>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              The MCP server connects to the <strong>same Neon database</strong> as the web app — changes made via Claude Desktop are immediately visible in the Person App UI.
            </p>
          </Card>

          {/* Demo Workflow */}
          <Card className="p-8 bg-blue-50 dark:bg-slate-800 border-blue-200/50 dark:border-slate-600/50">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Interactive CRUD Demo</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Walk through each operation step-by-step. Each step shows the Claude prompt and how the MCP server tool is called.
            </p>
            
            <div className="space-y-6">
              {/* Demo Step 1 - Create */}
              <div className={`p-6 rounded-lg border-2 transition-all ${demoStep >= 0 ? 'border-green-500 bg-white dark:bg-slate-700' : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold flex-shrink-0 ${demoStep >= 1 ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}>
                    {demoStep >= 1 ? '✓' : '1'}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-bold">CREATE</span>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create a Person</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      <strong>Say to Claude:</strong> "Create a new person named Alice Johnson, email alice@example.com, phone 555-0001, bio: Senior Developer"
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-3 overflow-x-auto">
                      <div className="text-gray-500 mb-1">// Claude calls MCP tool:</div>
                      <div>{`createPerson({`}</div>
                      <div className="ml-4">{`name: "Alice Johnson",`}</div>
                      <div className="ml-4">{`email: "alice@example.com",`}</div>
                      <div className="ml-4">{`phone: "555-0001",`}</div>
                      <div className="ml-4">{`bio: "Senior Developer"`}</div>
                      <div>{`})`}</div>
                      <div className="text-gray-500 mt-2">{`// Returns: { id: 1, name: "Alice Johnson", ... }`}</div>
                    </div>
                    <Button 
                      onClick={() => setDemoStep(Math.max(1, demoStep))}
                      disabled={demoStep >= 1}
                      variant={demoStep >= 1 ? "outline" : "default"}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-70"
                    >
                      {demoStep >= 1 ? '✓ Done' : 'Step Complete'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Demo Step 2 - Read */}
              <div className={`p-6 rounded-lg border-2 transition-all ${demoStep >= 1 ? 'border-blue-500 bg-white dark:bg-slate-700' : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 opacity-50'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold flex-shrink-0 ${demoStep >= 2 ? 'bg-blue-600 text-white' : demoStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {demoStep >= 2 ? '✓' : '2'}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-bold">READ</span>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Read All Persons</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      <strong>Say to Claude:</strong> "Show me all people in the database"
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-3 overflow-x-auto">
                      <div className="text-gray-500 mb-1">// Claude calls MCP tool:</div>
                      <div>{`readPerson({})`}</div>
                      <div className="text-gray-500 mt-2">{`// Returns: "Found 1 persons: [{ id: 1, name: ... }]"`}</div>
                    </div>
                    <Button 
                      onClick={() => setDemoStep(Math.max(2, demoStep))}
                      disabled={demoStep < 1 || demoStep >= 2}
                      variant={demoStep >= 2 ? "outline" : "default"}
                      size="sm"
                      className={demoStep >= 1 && demoStep < 2 ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                    >
                      {demoStep >= 2 ? '✓ Done' : 'Step Complete'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Demo Step 3 - Update */}
              <div className={`p-6 rounded-lg border-2 transition-all ${demoStep >= 2 ? 'border-purple-500 bg-white dark:bg-slate-700' : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 opacity-50'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold flex-shrink-0 ${demoStep >= 3 ? 'bg-purple-600 text-white' : demoStep >= 2 ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {demoStep >= 3 ? '✓' : '3'}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs font-bold">UPDATE</span>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Update a Person</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      <strong>Say to Claude:</strong> "Update person ID 1 to have bio: Principal Engineer with 10+ years experience"
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-3 overflow-x-auto">
                      <div className="text-gray-500 mb-1">// Claude calls MCP tool:</div>
                      <div>{`updatePerson({`}</div>
                      <div className="ml-4">{`id: 1,`}</div>
                      <div className="ml-4">{`bio: "Principal Engineer with 10+ years experience"`}</div>
                      <div>{`})`}</div>
                      <div className="text-gray-500 mt-2">// Returns: updated person object</div>
                    </div>
                    <Button 
                      onClick={() => setDemoStep(Math.max(3, demoStep))}
                      disabled={demoStep < 2 || demoStep >= 3}
                      variant={demoStep >= 3 ? "outline" : "default"}
                      size="sm"
                      className={demoStep >= 2 && demoStep < 3 ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
                    >
                      {demoStep >= 3 ? '✓ Done' : 'Step Complete'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Demo Step 4 - Delete */}
              <div className={`p-6 rounded-lg border-2 transition-all ${demoStep >= 3 ? 'border-red-500 bg-white dark:bg-slate-700' : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 opacity-50'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold flex-shrink-0 ${demoStep >= 4 ? 'bg-red-600 text-white' : demoStep >= 3 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {demoStep >= 4 ? '✓' : '4'}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-xs font-bold">DELETE</span>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delete a Person</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      <strong>Say to Claude:</strong> "Delete person with ID 1"
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-3 overflow-x-auto">
                      <div className="text-gray-500 mb-1">// Claude calls MCP tool:</div>
                      <div>{`deletePerson({ id: 1 })`}</div>
                      <div className="text-gray-500 mt-2">// Returns: "Person with ID 1 deleted successfully"</div>
                    </div>
                    <Button 
                      onClick={() => setDemoStep(4)}
                      disabled={demoStep < 3 || demoStep >= 4}
                      variant={demoStep >= 4 ? "outline" : "default"}
                      size="sm"
                      className={demoStep >= 3 && demoStep < 4 ? "bg-red-600 hover:bg-red-700 text-white" : ""}
                    >
                      {demoStep >= 4 ? '✓ Done' : 'Step Complete'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {demoStep >= 4 && (
              <div className="mt-8 p-6 bg-green-50 dark:bg-slate-700 border border-green-200 dark:border-green-600 rounded">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">CRUD Demo Complete!</h3>
                <p className="text-green-700 dark:text-green-300 mb-3">
                  All 5 Person CRUD tools demonstrated. Explore the Dice and Card Game demos below!
                </p>
                <Button onClick={() => setDemoStep(0)} variant="outline" size="sm">
                  Reset Demo
                </Button>
              </div>
            )}
          </Card>

          {/* Dice Demo */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm font-bold">DICE</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Roll Dice</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Roll any standard die or multiple dice with optional modifiers. Supports d4, d6, d8, d10, d12, d20, d100 and beyond.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Example prompts:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-none">
                  <li><span className="font-mono bg-gray-200 dark:bg-slate-600 px-2 py-0.5 rounded text-xs">&quot;Roll a d20&quot;</span> — one 20-sided die</li>
                  <li><span className="font-mono bg-gray-200 dark:bg-slate-600 px-2 py-0.5 rounded text-xs">&quot;Roll 4d6 and drop the lowest&quot;</span> — stat generation</li>
                  <li><span className="font-mono bg-gray-200 dark:bg-slate-600 px-2 py-0.5 rounded text-xs">&quot;Roll 2d6+3 for damage&quot;</span> — with modifier</li>
                </ul>
              </div>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto">
                <div className="text-gray-500 mb-1">// Claude calls MCP tool:</div>
                <div>{`rollDice({ sides: 20, count: 1 })`}</div>
                <div className="text-gray-500 mt-2">{`// Returns:`}</div>
                <div>{`// [DICE] Rolling 1d20`}</div>
                <div>{`// Rolls   : [17]`}</div>
                <div>{`// Total   : 17`}</div>
              </div>
            </div>
          </Card>

          {/* Poker Demo */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-bold">POKER</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Card Games — Poker</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Deal 5-card hands for up to 6 players from a shuffled deck, or evaluate any hand you provide.
              Card notation: <code className="bg-gray-100 dark:bg-slate-600 px-1 rounded">AS</code> = Ace of Spades, <code className="bg-gray-100 dark:bg-slate-600 px-1 rounded">KH</code> = King of Hearts.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Example prompts:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-none">
                  <li><span className="font-mono bg-gray-200 dark:bg-slate-600 px-2 py-0.5 rounded text-xs">&quot;Deal poker hands for 4 players&quot;</span></li>
                  <li><span className="font-mono bg-gray-200 dark:bg-slate-600 px-2 py-0.5 rounded text-xs">&quot;Evaluate this hand: AS KS QS JS 10S&quot;</span></li>
                </ul>
              </div>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto">
                <div className="text-gray-500 mb-1">{`// dealPokerHands({ players: 3 }) returns:`}</div>
                <div>{`[POKER] 3-player game`}</div>
                <div>{`========================================`}</div>
                <div>{`[WIN] Player 2: AS KS QS JS 10S`}</div>
                <div>{`        Royal Flush -- the best possible hand!`}</div>
                <div>{`  2.  Player 1: 7H 7D 7C KS KD`}</div>
                <div>{`        Full House -- 7s full of Ks`}</div>
                <div>{`  3.  Player 3: 2H 5D 9C JH AS`}</div>
                <div>{`        High Card -- A high`}</div>
              </div>
            </div>
          </Card>

          {/* Blackjack Demo */}
          <Card className="p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300 rounded-full text-sm font-bold">BLACKJACK</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Card Games — Blackjack</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Play a full round of Blackjack against a simulated dealer. Claude sees your hand and provides basic strategy advice.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">How to play (multi-turn conversation):</p>
                <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                  <li>Say: <span className="font-mono bg-gray-200 dark:bg-slate-600 px-1 rounded text-xs">&quot;Deal a blackjack hand&quot;</span></li>
                  <li>Claude shows your cards + dealer up-card + strategy advice</li>
                  <li>Say: <span className="font-mono bg-gray-200 dark:bg-slate-600 px-1 rounded text-xs">&quot;Hit me&quot;</span> to draw another card</li>
                  <li>Say: <span className="font-mono bg-gray-200 dark:bg-slate-600 px-1 rounded text-xs">&quot;Stand&quot;</span> when done — dealer reveals and winner is shown</li>
                </ol>
              </div>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto">
                <div className="text-gray-500 mb-1">{`// playBlackjack({ action: "deal" }) returns:`}</div>
                <div>{`[BLACKJACK] New Hand`}</div>
                <div>{`===================================`}</div>
                <div>{`Your hand   : KH 7D = 17`}</div>
                <div>{`Dealer shows: 6S + [hidden]`}</div>
                <div>{``}</div>
                <div>{`Basic strategy: Stand`}</div>
              </div>
            </div>
          </Card>

          {/* Troubleshooting */}
          <Card className="p-8 bg-yellow-50 dark:bg-slate-800 border-yellow-200/50 dark:border-slate-600/50">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Troubleshooting</h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">MCP Server not appearing in Claude</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1. Check that the file path to <code className="bg-gray-100 dark:bg-slate-600 px-1 rounded">dist/index.js</code> is absolute and correct<br/>
                  2. Ensure you ran <code className="bg-gray-100 dark:bg-slate-600 px-1 rounded">pnpm build</code> to generate the dist folder<br/>
                  3. Restart Claude Desktop completely<br/>
                  4. Check the Claude Desktop logs for errors
                </p>
              </div>

              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Database connection errors</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1. Use the pooled (not direct) connection string from Neon<br/>
                  2. Check that DATABASE_URL is set in the config's env section<br/>
                  3. Add <code className="bg-gray-100 dark:bg-slate-600 px-1 rounded">?sslmode=require</code> to the connection string
                </p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Get Started</h2>
            <p className="text-lg mb-6 text-blue-50">
              Full setup instructions to configure MCP in Claude Desktop
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                <Link href="/mcp-setup">Setup Guide</Link>
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
