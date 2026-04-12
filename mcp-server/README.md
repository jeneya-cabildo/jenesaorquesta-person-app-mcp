# Person App MCP Server v2.0

A Model Context Protocol (MCP) server that connects Claude Desktop to your Person App database **and** adds dice rolling and card game tools.

## Features

**Person CRUD (5 tools)**
- `createPerson` — create a new person record
- `readPerson` — get person by ID or list all
- `searchPerson` — search by name, email, or phone
- `updatePerson` — update any field by ID
- `deletePerson` — delete by ID

**Dice (1 tool)**
- `rollDice` — roll N dice with M sides + optional modifier (d4, d6, d8, d10, d12, d20, d100...)

**Card Games (2 tools)**
- `dealPokerHands` — deal 5-card hands for 1–6 players, evaluates and ranks all hands
- `playBlackjack` — multi-turn Blackjack with basic strategy advice (deal / hit / stand)

## Requirements

- Node.js 20.9+
- pnpm
- A Neon PostgreSQL database (same connection as the main app)

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy the environment file
cp .env.example .env
# Edit .env and set DATABASE_URL to your Neon pooled connection string

# 3. Generate Prisma client
pnpm dlx prisma generate

# 4. Build
pnpm build
```

## Claude Desktop Configuration

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)
or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "person-app-mcp": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/mcp-server/dist/index.js"],
      "env": {
        "DATABASE_URL": "your-neon-pooled-connection-string"
      }
    }
  }
}
```

Restart Claude Desktop. The hammer icon shows MCP tools are active.

## Card Notation

Suits: `S` (Spades), `H` (Hearts), `D` (Diamonds), `C` (Clubs)
Ranks: `A`, `2`–`10`, `J`, `Q`, `K`

Examples: `AS` = Ace of Spades, `KH` = King of Hearts, `10D` = Ten of Diamonds

## Example Prompts

**Person CRUD**
- "Create a person named Alice Smith, email alice@example.com"
- "Show all people in the database"
- "Find people named Alice"
- "Update person ID 3, set their bio to Data Scientist"
- "Delete person with ID 7"

**Dice**
- "Roll a d20"
- "Roll 4d6 for a D&D ability score"
- "Roll 2d6+3 for damage"

**Poker**
- "Deal a 4-player poker game"
- "Evaluate this hand: AS KS QS JS 10S"

**Blackjack**
- "Deal me a blackjack hand"
- "Hit me" (follow-up after seeing your cards)
- "Stand" (finish the round)

## Development

```bash
# Run in dev mode (no build needed)
pnpm dev
```