# Claude Desktop MCP Configuration Guide

## Quick Start: Getting Person App in Claude Desktop

This guide walks you through configuring Claude Desktop to use the Person App MCP server for CRUD operations.

## Prerequisites

Before starting, ensure you have:
- ✅ Claude Desktop installed ([download here](https://claude.ai/download))
- ✅ Node.js 20.9 or higher (`node --version`)
- ✅ Git installed
- ✅ Neon PostgreSQL database with connection string (pooled endpoint)

## Step-by-Step Configuration

### 1. Clone and Build the MCP Server

```bash
# Clone the repository
git clone https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp.git
cd jenesaorquesta-person-app-mcp

# Install dependencies
pnpm install

# Create .env.local with your database URL
cp .env.example .env.local
# Edit .env.local and add your Neon PostgreSQL connection string:
# DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/database?sslmode=require"

# Build the MCP server
pnpm build

# Verify build succeeded - you should see dist/index.js
ls -la dist/
```

### 2. Locate Your Claude Desktop Config File

The configuration location varies by operating system:

#### **macOS**
```bash
# Configuration file location:
~/.config/Claude/claude_desktop_config.json

# If the file doesn't exist, create the directory:
mkdir -p ~/.config/Claude
```

#### **Windows (PowerShell)**
```powershell
# Configuration file location:
$env:APPDATA\Claude\claude_desktop_config.json

# Example full path:
# C:\Users\YourUsername\AppData\Roaming\Claude\claude_desktop_config.json

# Create the directory if it doesn't exist:
$dir = "$env:APPDATA\Claude"
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force }
```

#### **Linux**
```bash
# Configuration file location:
~/.config/Claude/claude_desktop_config.json

# Create the directory if needed:
mkdir -p ~/.config/Claude
```

### 3. Add MCP Server Configuration

Open your `claude_desktop_config.json` file and add the Person App MCP server configuration.

#### **Example Configuration (macOS/Linux)**

```json
{
  "mcpServers": {
    "person-app": {
      "command": "node",
      "args": ["/Users/yourname/jenesaorquesta-person-app-mcp/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@host-pooler.neon.tech/database?sslmode=require"
      }
    }
  }
}
```

#### **Example Configuration (Windows)**

```json
{
  "mcpServers": {
    "person-app": {
      "command": "node",
      "args": ["C:\\Users\\YourUsername\\jenesaorquesta-person-app-mcp\\dist\\index.js"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@host-pooler.neon.tech/database?sslmode=require"
      }
    }
  }
}
```

**Important:** Replace the path with where you cloned the repository!

### 4. Restart Claude Desktop

1. **Quit Claude Desktop completely** (not just close the window)
2. **Reopen Claude Desktop**
3. Look for the **MCP icon** (⚙️) in the bottom right corner

### 5. Verify Installation

Once Claude Desktop restarts, check if the Person App server is loaded:

1. Click the **MCP icon** (gear icon) in the bottom right
2. You should see **"person-app"** listed as an available MCP server
3. The server status should show as **"Connected"** (green dot)

If you see the server listed and connected, you're ready to use it! 🎉

## Testing the MCP Server

Try these prompts in Claude Desktop:

```
Create a new person with the name Alice Johnson, email alice@example.com, and phone 555-0100
```

```
Show me all people in the database
```

```
Update the person with ID 1 to have email newemail@example.com
```

```
Delete the person with ID 1
```

## Troubleshooting

### "Person App" doesn't appear in Claude Desktop

**Problem:** The MCP server isn't showing up in Claude's tool list

**Solutions:**

1. **Verify the path is correct**
   - Check that the path in your config points to an actual `dist/index.js` file
   - On Windows, use backslashes: `C:\\Users\\Name\\path\\dist\\index.js`
   - On macOS/Linux, use forward slashes: `/Users/name/path/dist/index.js`

2. **Rebuild the MCP server**
   ```bash
   cd /path/to/jenesaorquesta-person-app-mcp
   pnpm install
   pnpm build
   ```

3. **Check the config file syntax**
   - Validate JSON at https://jsonlint.com/
   - Ensure all quotes are straight quotes (not curly quotes)
   - No trailing commas in arrays or objects

4. **View Claude Debug Logs**
   - macOS: `~/Library/Logs/Claude/mcp.log`
   - Windows: `%APPDATA%\Claude\logs\mcp.log`
   - Linux: `~/.config/Claude/logs/mcp.log`

### Database Connection Error

**Problem:** Server shows "Connected" but CRUD operations fail

**Solutions:**

1. **Verify DATABASE_URL**
   ```bash
   cd /path/to/jenesaorquesta-person-app-mcp
   cat .env.local  # Check the URL is set correctly
   ```

2. **Test database connection**
   ```bash
   pnpm exec prisma db execute --stdin < /dev/null
   ```

3. **Use the pooled endpoint**
   - For Neon, make sure you're copying the **Pooled connection** endpoint
   - It should contain `.pooler.neon.tech`

4. **Check network/firewall**
   - Ensure your network allows PostgreSQL connections on port 5432
   - Test from terminal: `nc -zv host-pooler.neon.tech 5432`

### "Node command not found" Error

**Problem:** Claude can't find the Node.js executable

**Solutions:**

1. **Find Node.js path**
   ```bash
   # macOS/Linux
   which node

   # Windows PowerShell
   Get-Command node
   ```

2. **Use full path to node in config**
   ```json
   {
     "mcpServers": {
       "person-app": {
         "command": "/usr/local/bin/node",
         "args": ["/path/to/dist/index.js"]
       }
     }
   }
   ```

### Server Crashes After Starting

**Problem:** Server starts but crashes immediately

**Solutions:**

1. **Test locally first**
   ```bash
   cd /path/to/jenesaorquesta-person-app-mcp
   pnpm dev
   ```
   Watch for error messages in the terminal

2. **Check environment setup**
   - Ensure `DATABASE_URL` is set correctly
   - Test with `pnpm exec prisma db execute`

3. **Clear Prisma cache**
   ```bash
   rm -rf node_modules/.prisma
   pnpm install
   pnpm build
   ```

## Configuration Examples

### Full Config with Multiple Servers

```json
{
  "mcpServers": {
    "person-app": {
      "command": "node",
      "args": ["/path/to/jenesaorquesta-person-app-mcp/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@host-pooler.neon.tech/database?sslmode=require"
      }
    }
  }
}
```

### Using Environment Variables

Instead of hardcoding DATABASE_URL in the config, you can use shell environment variables:

```json
{
  "mcpServers": {
    "person-app": {
      "command": "node",
      "args": ["/path/to/dist/index.js"]
    }
  }
}
```

Then set in your shell:
```bash
export DATABASE_URL="postgresql://..."

# macOS - add to ~/.zprofile or ~/.bash_profile
# Windows - set permanently in System Properties > Environment Variables
```

## Understanding the Configuration

- **`command`**: The executable to run (must be "node" for Node.js MCP servers)
- **`args`**: Array of arguments passed to the command (path to the compiled server)
- **`env`**: Optional environment variables passed to the MCP server process

The MCP server runs as a subprocess and communicates with Claude Desktop via stdio (standard input/output).

## Security Best Practices

1. **Never commit `.env.local` to version control**
   - Git is already configured to ignore it

2. **Use secure database credentials**
   - Rotate passwords regularly
   - Use role-based access control (Neon provides this)

3. **Limit database permissions**
   - The MCP server only needs SELECT, INSERT, UPDATE, DELETE on the `Person` table

4. **Monitor access logs**
   - Check your PostgreSQL logs for suspicious activity
   - Neon provides query insights in the dashboard

## Next Steps

Once you've verified the MCP server is working:

1. **Test all CRUD operations** in Claude Desktop
2. **Try the interactive demo** at https://person-search-orquesta.vercel.app/mcp/demo
3. **Explore advanced features** like filtering and pagination
4. **Contribute improvements** to the [GitHub repository](https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp)

## Getting Help

If you encounter issues:

1. **Check the [MCP Setup Page](https://person-search-orquesta.vercel.app/mcp/setup)** on the main app
2. **Review [Server Logs](https://person-search-orquesta.vercel.app/mcp/demo)** in the demo page
3. **Open an issue** on [GitHub](https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp/issues)
4. **Check Claude Desktop logs** for connection errors

## Learn More

- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [Claude Desktop docs](https://github.com/anthropics/anthropic-sdk-python)
- [MCP Server Implementation](https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp)
- [Person App GitHub Repository](https://github.com/jeneya-cabildo/jenesaorquesta-person-app)
