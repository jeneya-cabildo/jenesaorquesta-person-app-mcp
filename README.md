# Person App - MCP-Enabled CRUD Application

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=nextjs)
![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat&logo=typescript)
![Neon PostgreSQL](https://img.shields.io/badge/Neon-PostgreSQL-336791?style=flat&logo=postgresql)
![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000?style=flat&logo=vercel)
![MCP](https://img.shields.io/badge/MCP-Enabled-FF6B6B?style=flat)

A production-ready Person management application with full CRUD operations, serverless PostgreSQL database, and **MCP (Model Context Protocol) integration** enabling Claude Desktop to manage contacts via natural language.

## 🌟 Highlights

✅ **Complete CRUD Operations** - Create, read, update, delete person records  
✅ **Production Database** - Neon PostgreSQL with auto-scaling and pooling  
✅ **Server Actions** - No REST API required, direct database mutations  
✅ **MCP Server** - Claude Desktop can manage your contacts through AI  
✅ **Type-Safe** - Full TypeScript throughout frontend and backend  
✅ **Dark Mode** - Complete dark/light theme support  
✅ **Responsive** - Mobile-optimized UI with Tailwind CSS  
✅ **Auto-Deployed** - Vercel integration with CI/CD  
✅ **Documented** - Step-by-step guides for all features  

## 🎯 Live Demo

**Try it now:** [https://person-search-orquesta.vercel.app](https://person-search-orquesta.vercel.app)

### Key Pages
- **Home** - Search and manage people
- **[/about](https://person-search-orquesta.vercel.app/about)** - Architecture overview and MCP explanation
- **[/database](https://person-search-orquesta.vercel.app/database)** - Database schema and Neon details
- **[/mcp/setup](https://person-search-orquesta.vercel.app/mcp/setup)** - MCP server setup guide
- **[/mcp/demo](https://person-search-orquesta.vercel.app/mcp/demo)** - Interactive MCP testing
- **[/github](https://person-search-orquesta.vercel.app/github)** - Repository links

## 🤖 MCP Integration - Use Claude Desktop to Manage Contacts

This app includes a separate **MCP Server** that lets Claude Desktop perform person CRUD operations through natural language!

### Example Claude Prompts
```
"Create a new person named Alice Johnson with email alice@example.com"
"Show me all people in the database"
"Update person ID 1 to have a new email address"
"Delete the contact with ID 5"
```

### Quick MCP Setup
1. Clone the [MCP Server Repository](https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp)
2. Install and build: `pnpm install && pnpm build`
3. Configure Claude Desktop with your database URL
4. Restart Claude - "Person App" MCP server will appear!

📖 **[Complete Claude Desktop Setup Guide](docs/CLAUDE_DESKTOP_SETUP.md)**

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with Turbopack |
| **React 19.2** | Latest React with concurrent rendering |
| **TypeScript 5+** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first styling with dark mode |
| **Shadcn UI** | Production components (Radix UI based) |
| **React Hook Form** | Efficient form state management |
| **Zod** | Runtime schema validation |

### Backend & Database
| Technology | Purpose |
|------------|---------|
| **Next.js Server Actions** | Secure backend operations (no REST API) |
| **Prisma ORM v7** | Type-safe database access |
| **Neon PostgreSQL** | Serverless, auto-scaling database |
| **PG Adapter** | Connection pooling for Vercel |

### AI Agent Integration
| Technology | Purpose |
|------------|---------|
| **MCP SDK** | Model Context Protocol framework |
| **Node.js** | MCP server runtime |
| **tsup** | TypeScript bundler |

### Deployment
| Technology | Purpose |
|------------|---------|
| **Vercel** | Edge functions, auto-scaling, CI/CD |
| **GitHub** | Source control and CI/CD |

## 📋 System Requirements

- **Node.js 20.9+** - Required for Next.js 16
- **pnpm 10+** - Package manager
- **Neon Account** - Free tier available at [neon.tech](https://neon.tech)
- **Vercel Account** - Free tier available at [vercel.com](https://vercel.com)
- **Claude Desktop** - For MCP testing (optional)

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/jeneya-cabildo/jenesaorquesta-person-app.git
cd jenesaorquesta-person-app
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Setup Database
Get your Neon connection string from [console.neon.tech](https://console.neon.tech):

```bash
cp .env.example .env.local
# Edit .env.local and add your DATABASE_URL
```

**Use the pooled endpoint** (`-pooler`) for Vercel compatibility:
```
postgresql://user:password@host-pooler.neon.tech/database?sslmode=require
```

### 4. Run Migrations
```bash
pnpm db:migrate
```

### 5. Start Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[docs/CLAUDE_DESKTOP_SETUP.md](docs/CLAUDE_DESKTOP_SETUP.md)** | Complete guide to configure Claude Desktop with MCP server |
| **[docs/MCP_SERVER.md](docs/MCP_SERVER.md)** | MCP server architecture and implementation |
| **[docs/NEON_SETUP.md](docs/NEON_SETUP.md)** | Neon PostgreSQL configuration guide |
| **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** | Vercel deployment instructions |
| **[docs/MIGRATION_SUMMARY.md](docs/MIGRATION_SUMMARY.md)** | Supabase to Neon migration details |
| **[QUICK_START.md](QUICK_START.md)** | 5-minute reference guide |

## ⚡ Available Commands

```bash
# Development
pnpm dev              # Start development server (http://localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run pending migrations
pnpm db:seed          # Seed database with sample data
pnpm db:studio        # Open Prisma Studio (visual database editor)
pnpm db:push          # Push schema to database (no migration)
pnpm db:reset         # Reset database (development only)
```

## 📊 Database Architecture

```
┌─────────────────────────┐
│   React Components      │
│   (UI Layer)            │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│ Next.js Server Actions  │
│ (Business Logic)        │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│   Prisma ORM v7         │
│   (Type-Safe Access)    │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│  PG Adapter             │
│  (Connection Pooling)   │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│ Neon PostgreSQL         │
│ (Serverless Database)   │
└─────────────────────────┘
```

### Why Neon + Vercel?
- ✅ **Serverless** - Auto-scales with traffic, no servers to manage
- ✅ **Connection Pooling** - Built-in PgBouncer for Vercel's stateless functions
- ✅ **Free Tier** - Generous free credits for getting started
- ✅ **Backups** - Automatic daily backups included
- ✅ **Performance** - Optimized for modern serverless deployments
- ✅ **Cost Efficient** - Pay-per-use, no idle charges

## 🔄 API Architecture

### Why Server Actions Instead of REST APIs?

This app uses **Next.js Server Actions** for all backend operations:

```tsx
// app/actions/person.ts
'use server'

export const createPerson = async (data: PersonFormData) => {
  const person = await prisma.person.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      bio: data.bio
    }
  })
  revalidatePath('/')
  return person
}
```

**Benefits:**
- ✅ **Type-Safe** - TypeScript validates both client and server
- ✅ **Secure** - No public API endpoints to exploit
- ✅ **Efficient** - Direct database access without HTTP round trips
- ✅ **Simple** - No API routes to maintain
- ✅ **CSRF Safe** - Automatic CSRF token handling

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Database Connection Issues
```bash
# Verify DATABASE_URL is set
echo $DATABASE_URL

# Test connection with Prisma
pnpm exec prisma db execute --stdin < /dev/null

# Check Neon dashboard for connection limits
# Visit https://console.neon.tech
```

### Migration Errors
```bash
# Check migration status
pnpm exec prisma migrate status

# Reset development database (WARNING: deletes all data)
pnpm exec prisma migrate reset

# View detailed error logs
pnpm exec prisma migrate dev --verbose
```

### MCP Server Not Showing in Claude Desktop
See **[Claude Desktop Setup Guide](docs/CLAUDE_DESKTOP_SETUP.md)** for detailed troubleshooting

## ⚙️ Configuration

### Environment Variables
```bash
# .env.local (create from .env.example)
DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/database?sslmode=require"
```

### Vercel Deployment
Add to your Vercel project environment variables:
```
DATABASE_URL = postgresql://[user]:[password]@[host]-pooler.neon.tech/[database]?sslmode=require
```

Use the `-pooler` endpoint for serverless functions!

## 📈 Performance Tips

1. **Always use pooled endpoints** - Required for Vercel's serverless functions
2. **Batch queries** - Use `findMany()` instead of multiple `findFirst()` calls
3. **Enable caching** - Use Next.js ISR for static content
4. **Monitor slow queries** - Check Neon dashboard for performance issues
5. **Index important fields** - Prisma auto-indexes `@unique` and `@id` fields

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please ensure:
- Code follows TypeScript best practices
- Changes are tested locally
- Commit messages are descriptive
- README is updated if needed

## 📞 Support & Resources

### Official Documentation
- **[Neon Docs](https://neon.tech/docs)** - Database configuration
- **[Vercel Docs](https://vercel.com/docs)** - Deployment & serverless
- **[Next.js Docs](https://nextjs.org/docs)** - Framework reference
- **[Prisma Docs](https://www.prisma.io/docs)** - ORM guide
- **[MCP Spec](https://modelcontextprotocol.io)** - Protocol documentation

### Project Resources
- **[GitHub Repository](https://github.com/jeneya-cabildo/jenesaorquesta-person-app)** - Source code
- **[MCP Server Repository](https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp)** - Separate MCP server
- **[Issue Tracker](https://github.com/jeneya-cabildo/jenesaorquesta-person-app/issues)** - Bug reports
- **[Discussions](https://github.com/jeneya-cabildo/jenesaorquesta-person-app/discussions)** - Q&A

## 📄 License

This project is open source under the **MIT License**. See [LICENSE](LICENSE) file for details.

## 🎓 Learning Resources

This project demonstrates professional development practices:

- **Server-Side Rendering** - Next.js server components and actions
- **Type Safety** - End-to-end TypeScript with Prisma
- **Database Design** - PostgreSQL schema with Prisma migrations
- **AI Integration** - MCP protocol for Claude Desktop
- **Responsive UI** - Tailwind CSS with dark mode
- **Form Handling** - React Hook Form with Zod validation
- **Deployment** - Serverless functions on Vercel
- **Error Handling** - Graceful error boundaries and fallbacks

## 🙏 Acknowledgments

Built with these amazing tools:
- **Next.js** - The React framework for production
- **Prisma** - The ORM for TypeScript
- **Neon** - Serverless Postgres
- **Vercel** - The Edge platform
- **Shadcn UI** - High-quality components
- **tailwindcss** - Utility-first CSS
- **Model Context Protocol** - AI agent standardization

---

**Made with ❤️ by [Jeneya Cabildo](https://github.com/jeneya-cabildo)**

**[Live Demo](https://person-search-orquesta.vercel.app) • [GitHub](https://github.com/jeneya-cabildo/jenesaorquesta-person-app) • [MCP Server](https://github.com/jeneya-cabildo/jenesaorquesta-person-app-mcp) • [Docs](docs/)**
