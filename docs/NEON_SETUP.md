# Neon Database Setup Guide

This app has been configured to use **Neon** as the primary PostgreSQL database provider.

## What Changed

✅ **Removed:**
- Supabase dependencies (`@supabase/ssr`, `@supabase/supabase-js`)
- Supabase-specific middleware and utility functions
- All Supabase environment variables

✅ **Updated:**
- Prisma schema with explicit `DATABASE_URL` configuration
- Middleware to use only Next.js functionality
- Environment variable setup for Neon

## Local Setup (Development)

### Step 1: Complete Neon Initialization

The `npx neonctl@latest init` command is running in your terminal. Complete it by:

1. When asked about editors, deselect all and press Enter (unless you want MCP integration)
2. Follow the prompts to authenticate with Neon
3. Create a new Neon project or select an existing one

### Step 2: Get Your Connection String

After initialization completes:

```bash
# Your Neon connection string will be printed
# It looks like: postgresql://[user]:[password]@[host].neon.tech/[database]
```

### Step 3: Set Local Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Neon connection string:

```
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname"
```

### Step 4: Generate Prisma Client

```bash
pnpm db:generate
```

### Step 5: Run Migrations

```bash
pnpm db:migrate
```

This will:
- Create the Person table in your Neon database
- Generate migration files

### Step 6: Seed the Database (Optional)

```bash
pnpm db:seed
```

### Step 7: Start Development Server

```bash
pnpm dev
```

Your app should now connect to Neon!

## Vercel Deployment

### Step 1: Set Environment Variable

In Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `DATABASE_URL` with your Neon connection string

**Note:** Use the pooled connection string for Vercel:
```
postgresql://[user]:[password]@[host]-pooler.neon.tech/[database]
```

The pooler endpoint is better for serverless functions.

### Step 2: Update Build and Start Commands

Ensure these are set in Vercel:
- **Build Command:** `pnpm build`
- **Start Command:** `pnpm start`

The app will automatically run migrations on first deployment.

### Step 3: Deploy

```bash
git add .
git commit -m "Migrate to Neon database"
git push
```

Vercel will automatically deploy on push.

## Troubleshooting

### Error: "DATABASE_URL is not set"

1. Ensure `.env.local` exists with the correct connection string
2. For Vercel, check that `DATABASE_URL` is set in Environment Variables

### Error: "Cannot find module '@supabase/ssr'"

1. Run `pnpm install` to update dependencies
2. Clear node_modules: `rm -rf node_modules && pnpm install`

### Connection Timeout

1. Check your Neon project is active
2. Verify the connection string is correct
3. For Vercel, use the `-pooler` endpoint instead

### Prisma Client Issues

Regenerate the client:
```bash
pnpm db:generate
```

## Database Management

### Access Database UI

```bash
pnpm db:studio
```

Opens Prisma Studio to browse/edit data.

### View Migrations

Migrations are stored in `prisma/migrations/`

### Connection Pooling

For serverless deployments, Neon provides a pooled endpoint:

```
postgresql://[user]:[password]@host-pooler.neon.tech/database
```

Use this for Vercel deployments instead of the direct connection.

## Next Steps

1. ✅ Complete the interactive `neonctl init` in your terminal
2. ✅ Copy connection string to `.env.local`
3. ✅ Run `pnpm db:migrate`
4. ✅ Test with `pnpm dev`
5. ✅ Deploy to Vercel with `DATABASE_URL` environment variable

Your app is now fully configured for Neon! 🎉
