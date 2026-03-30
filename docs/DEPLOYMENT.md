# Person App - Deployment Guide

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free tier available)
- PostgreSQL database (Vercel Postgres, Railway, or other provider)

## Step-by-Step Deployment to Vercel

### 1. Prepare Your GitHub Repository

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Production Person App - Week 3 Deliverable"
git push origin main
```

### 2. Create a PostgreSQL Database

**Option A: Vercel Postgres (Recommended)**
- Go to https://vercel.com/postgres
- Create a new database
- Copy the connection string

**Option B: Railway.app**
- Sign up at railway.app
- Create a new PostgreSQL database
- Copy the connection string

**Option C: Other Providers**
- Neon, Supabase, or any PostgreSQL provider
- Ensure you have the connection string

### 3. Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./ (default)
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`

4. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```

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
