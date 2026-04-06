# Person App MCP Server

Model Context Protocol server for performing Person CRUD operations through Claude Desktop and other MCP clients.

## Overview

This MCP server enables AI agents (like Claude Desktop) to manage person records in a Neon PostgreSQL database through natural language commands. It provides full Create, Read, Update, Delete (CRUD) functionality.

## Features

- **Create Persons** - Add new person records with full details
- **Read Persons** - Query single ID or list all persons
- **Update Persons** - Modify existing person records
- **Delete Persons** - Remove person records safely
- **Type Safety** - Full TypeScript support with Prisma ORM
- **Connection Pooling** - Optimized for serverless environments

## Repository

Source code: https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp

## Quick Start

### Prerequisites

- Node.js 20.9 or higher
- pnpm or npm
- Neon PostgreSQL database (free tier available at neon.tech)

### Installation

```bash
# Clone the repository
git clone https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp.git
cd jenesaorquesta-person-app-mcp

# Install dependencies
pnpm install

# Build the project
pnpm build

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your DATABASE_URL
```

### Configuration in Claude Desktop

1. Find your Claude Desktop config file:
   - **macOS/Linux**: `~/.config/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the MCP server configuration:
```json
{
  "mcpServers": {
    "person-app": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@host-pooler.neon.tech/dbname"
      }
    }
  }
}
```

3. Restart Claude Desktop

4. In Claude, you should now see Person App MCP tools available

## Available Tools

### createPerson
Create a new person record.

**Parameters:**
- `name` (string, required) - Person's full name
- `email` (string, required) - Person's email address
- `phone` (string, optional) - Person's phone number
- `address` (string, optional) - Person's address
- `bio` (string, optional) - Person's biography

**Example:**
```
Create a person named John Doe with email john@example.com
```

### readPerson
Get person records by ID or list all persons.

**Parameters:**
- `id` (number, optional) - Person's ID. If omitted, returns all persons

**Example:**
```
Show me all people in the database
Get person with ID 1
```

### updatePerson
Update an existing person record.

**Parameters:**
- `id` (number, required) - Person's ID
- `name` (string, optional) - Updated name
- `email` (string, optional) - Updated email
- `phone` (string, optional) - Updated phone
- `address` (string, optional) - Updated address
- `bio` (string, optional) - Updated biography

**Example:**
```
Update person 1 to change their email to newemail@example.com
```

### deletePerson
Delete a person record.

**Parameters:**
- `id` (number, required) - Person's ID

**Example:**
```
Delete the person with ID 5
```

## Tech Stack

- **MCP Framework**: @modelcontextprotocol/sdk
- **Runtime**: Node.js
- **Database**: Neon PostgreSQL
- **ORM**: Prisma v7
- **Language**: TypeScript
- **Build**: tsup

## Architecture

```
┌─────────────────────────────┐
│    Claude Desktop           │
│  (with MCP Client)          │
└──────────┬──────────────────┘
           │
        MCP Protocol
           │
           ▼
┌─────────────────────────────┐
│ Person App MCP Server       │
│ (Node.js)                   │
│                             │
│ Tools:                      │
│ • createPerson             │
│ • readPerson               │
│ • updatePerson             │
│ • deletePerson             │
└──────────┬──────────────────┘
           │
        Prisma ORM
           │
           ▼
┌─────────────────────────────┐
│ Neon PostgreSQL             │
│ (Serverless Database)       │
└─────────────────────────────┘
```

## Development

### Build
```bash
pnpm build
```

### Watch mode
```bash
pnpm dev
```

### Testing
```bash
pnpm test
```

## Database Schema

The MCP server works with the Person table:

```prisma
model Person {
  id        Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  phone     String?
  address   String?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Environment Variables

Create a `.env.local` file:

```
DATABASE_URL="postgresql://[user]:[password]@[host]-pooler.neon.tech/[database]"
```

For Vercel/serverless deployments, use the pooled endpoint (with `-pooler` in the host).

## Troubleshooting

### MCP Server not appearing in Claude

1. Check that the server is running/built
2. Verify the config file path is correct
3. Ensure DATABASE_URL is set in the environment
4. Restart Claude Desktop completely
5. Check Claude Desktop logs for errors

### Database connection errors

1. Verify DATABASE_URL is correct
2. Use the pooled endpoint for serverless
3. Check network connectivity to Neon
4. Ensure the database and Person table exist
5. Verify user permissions

### Tool execution fails

1. Check the error message from Claude
2. Verify the MCP server is running
3. Review server logs for details
4. Ensure Prisma migrations are up to date

## Performance Tips

- Use the pooled endpoint for serverless environments
- Connection pooling is configured via PG Adapter
- Database indexes are optimized for common queries
- Queries are type-safe through Prisma

## Security

- Environment variables are used for sensitive data
- Database connection strings are never logged
- No authentication is built in (use your own API gateway)
- Suitable for internal tools and development

## Related Projects

- [Person App](https://github.com/jeneya-cabildo/jenesaorquesta-person-app) - Main application
- [Live Demo](https://person-search-orquesta.vercel.app) - Try the app

## License

MIT
