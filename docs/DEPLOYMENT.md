# Person App - Deployment Guide

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free tier available)
- **Neon PostgreSQL database** (free tier available at https://neon.tech)

## Database Setup: Neon

This application uses **Neon** as its PostgreSQL provider. Neon is a serverless PostgreSQL database that's perfect for Vercel deployments.

### Why Neon?
✅ Free tier available  
✅ Serverless - no need to manage servers  
✅ Automatic scaling  
✅ Connection pooling included  
✅ Perfect for Vercel deployments  

For detailed Neon setup instructions, see [NEON_SETUP.md](./NEON_SETUP.md)

## Step-by-Step Deployment to Vercel

### 1. Complete Local Setup

See [NEON_SETUP.md](./NEON_SETUP.md) for:
- Initializing Neon with `neonctl init`
- Creating `.env.local` with your connection string
- Running migrations locally
- Testing locally with `pnpm dev`

### 2. Prepare Your GitHub Repository

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Production Person App - Ready for Vercel deployment"
git push origin main
```

### 3. Create a Neon Project

1. Go to https://neon.tech and sign up (free)
2. Create a new project
3. Get your connection string from the Neon dashboard
4. Keep the **pooled connection string** for Vercel (ends with `-pooler.neon.tech`)

### 4. Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./ (default)
   - **Build Command:** `pnpm build`
   - **Start Command:** `pnpm start`

4. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://[user]:[password]@[host]-pooler.neon.tech/[database]
   ```
   
   Use the **pooled endpoint** (with `-pooler`) for Vercel serverless functions.

5. Click "Deploy"

### 5. Verify Deployment

After deployment completes:
1. Check Vercel deployment logs for any errors
2. Visit your deployed URL
3. Test the search functionality

## Environment Variables

### Local Development (`.env.local`)
```
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Vercel Production
```
DATABASE_URL=postgresql://user:password@host-pooler.neon.tech/dbname
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**Note:** Use the pooled endpoint (`-pooler`) in Vercel, not the direct connection.

## Troubleshooting

### Database Connection Issues

**Error: "Cannot connect to database"**
- Verify `DATABASE_URL` is set in environment variables
- Check the connection string format
- For Vercel, ensure you're using the `-pooler` endpoint

**Error: "password authentication failed"**
- Double-check credentials in connection string
- Verify connection string has correct username and password
- Reset password in Neon dashboard if needed

### Migrations Not Running

**Error: "Unable to find migrations"**
```bash
# Manually run migrations
pnpm db:migrate
```

## Monitoring Your Deployment

1. **Vercel Dashboard:**
   - View build logs
   - Monitor response times
   - Check error rates

2. **Neon Dashboard:**
   - Monitor database usage
   - Check connection count
   - View query performance

3. **Local Testing:**
   ```bash
   pnpm db:studio  # Opens Prisma Studio to browse database
   ```

## Rollback Procedure

If you need to revert to a previous version:

1. In Vercel, click "Deployments"
2. Find a previous successful deployment
3. Click the three dots and select "Redeploy"

## Next Steps

After successful deployment:

1. Update your domain/DNS if using a custom domain
2. Set up monitoring and alerting
3. Configure automatic deploy on new commits (default in Vercel)
4. Test all features in production
5. Set up database backups (Neon includes automatic backups)

## Support

- **Neon Documentation:** https://neon.tech/docs/introduction
- **Vercel Documentation:** https://vercel.com/docs
- **Prisma Documentation:** https://www.prisma.io/docs


5. Click "Deploy"

### 4. Run Database Migrations

After deployment, run migrations:

```bash
npx prisma migrate deploy
```

Or if starting fresh:

```bash
npx prisma migrate dev --name init
```

### 5. Seed Sample Data

```bash
npx prisma db seed
```

## Environment Variables

The application requires:

- `DATABASE_URL` - PostgreSQL connection string (required for production)

## Post-Deployment Verification

1. Visit your Vercel deployment URL
2. Test CRUD operations:
   - ✅ Create a new person
   - ✅ Search for people
   - ✅ Edit a person
   - ✅ Delete a person

3. Verify documentation pages:
   - ✅ `/about` page
   - ✅ `/github` page (redirects to GitHub repo)
   - ✅ `/database` page (shows schema)

## Troubleshooting

### Database Connection Error
- Verify `DATABASE_URL` is set in Vercel environment variables
- Check database server is accessible from Vercel
- Ensure IP whitelisting allows Vercel

### Build Failures
- Check logs in Vercel dashboard
- Ensure all dependencies are listed in `package.json`
- Verify TypeScript compilation with `npm run build` locally

### Prisma Issues
- Run `npx prisma generate` to regenerate client
- Clear `.next` folder and rebuild
- Ensure schema is synced with database: `npx prisma migrate deploy`

## Updating Your Deployment

To push updates:

```bash
git add .
git commit -m "Update Person App"
git push origin main
```

Vercel will automatically redeploy on push to main branch.

## Database Management

View and manage your database:

```bash
npx prisma studio
```

This opens an interface to browse and edit data in your database.

## Alternative: Manual Database Setup

If using Vercel Postgres:

1. Connect to Vercel Postgres dashboard
2. Copy the connection string
3. Add to Vercel environment variables
4. Run `npx prisma migrate deploy`
5. Run `npx prisma db seed`
