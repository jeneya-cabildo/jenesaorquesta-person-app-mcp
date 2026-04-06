# Getting "Person App" into Claude Desktop - Quick Reference

This guide summarizes the steps to get the Person App MCP server working in Claude Desktop.

## ✅ What You Need

- ✅ [Claude Desktop](https://claude.ai/download) installed
- ✅ Node.js 20.9+ (`node --version`)
- ✅ Neon PostgreSQL database (from [neon.tech](https://neon.tech))
- ✅ The Pooled connection string from your Neon project

## 🎯 5-Minute Quick Setup

### Step 1: Clone and Build the MCP Server (2 min)

```bash
# Clone the repository
git clone https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp.git
cd jenesaorquesta-person-app-mcp

# Install dependencies
pnpm install

# Build the server
pnpm build
```

**Verify:** You should see `dist/index.js` created ✓

### Step 2: Create Environment File (1 min)

```bash
# Copy template
cp .env.example .env.local

# Edit .env.local and add your DATABASE_URL
# Example:
# DATABASE_URL="postgresql://username:password@host-pooler.neon.tech/database?sslmode=require"
```

### Step 3: Configure Claude Desktop (1 min)

**Find your config file:**

| OS | Location |
|----|----------|
| **macOS/Linux** | `~/.config/Claude/claude_desktop_config.json` |
| **Windows** | `%APPDATA%\Claude\claude_desktop_config.json` |

**Add this configuration:**

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

⚠️ **IMPORTANT:** Replace `/path/to/` with your actual path!

Examples:
- macOS: `/Users/username/Projects/jenesaorquesta-person-app-mcp/dist/index.js`
- Windows: `C:\\Users\\username\\Documents\\jenesaorquesta-person-app-mcp\\dist\\index.js`
- Linux: `/home/username/jenesaorquesta-person-app-mcp/dist/index.js`

### Step 4: Restart Claude Desktop (1 min)

1. **Quit Claude** completely (⌘Q on Mac, Alt+F4 on Windows)
2. **Reopen Claude**
3. Look for the **⚙️ MCP icon** in the bottom right
4. Verify **"person-app"** appears as connected

## 🧪 Test It

Try these prompts in Claude:

```
Create a new person named John Smith with email john@example.com
```

```
Show me all people in the database
```

```
Update person ID 1 with email newemail@example.com
```

```
Delete person ID 2
```

## 🐛 Troubleshooting

### "Person App" doesn't appear in Claude

1. Check the path in your config is correct
2. Verify `dist/index.js` exists: `ls -la dist/`
3. Check config file syntax at https://jsonlint.com/
4. **Restart Claude Desktop completely**
5. Look at logs: `~/.config/Claude/logs/mcp.log`

### Database connection errors

1. Test locally first:
   ```bash
   pnpm dev
   ```
   Look for error messages

2. Verify DATABASE_URL:
   ```bash
   cat .env.local  # Check it's set
   ```

3. Make sure you're using the **Pooled connection** from Neon

### "Node command not found"

Use the full path to Node:

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

Find Node path:
```bash
which node  # macOS/Linux
Get-Command node  # Windows PowerShell
```

## 📚 Learning Resources

- **[Full Claude Desktop Setup Guide](docs/CLAUDE_DESKTOP_SETUP.md)** - Detailed with screenshots
- **[Main App Live Demo](https://person-search-orquesta.vercel.app)** - Try the web interface
- **[MCP Setup Page](https://person-search-orquesta.vercel.app/mcp/setup)** - In-app guide
- **[MCP Demo](https://person-search-orquesta.vercel.app/mcp/demo)** - Interactive testing
- **[MCP Server Repository](https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp)** - Source code

## ⏱️ Common Issues Timeline

| Issue | Fix | Time |
|-------|-----|------|
| Claude doesn't reload | Quit and reopen completely | 30s |
| Path invalid | Copy full path carefully | 1m |
| DB connection fails | Use `-pooler` endpoint, not regular | 2m |
| "Person App" still missing | Clear config, restart, check logs | 5m |

## 🎉 Success Indicators

✅ "person-app" shows in Claude's MCP list  
✅ Status shows "Connected" (green dot)  
✅ Claude can understand "Create a person named..."  
✅ Database records appear after commands  

## 📞 Still Having Issues?

1. Review the [detailed troubleshooting guide](docs/CLAUDE_DESKTOP_SETUP.md#troubleshooting)
2. Check [GitHub Issues](https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp/issues)
3. Try the offline testing: `pnpm dev` in MCP directory

---

**Made with ❤️ to make Claude AI agent-powered contact management easy**

[GitHub](https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp) • [Live Demo](https://person-search-orquesta.vercel.app) • [Report Issues](https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp/issues)
