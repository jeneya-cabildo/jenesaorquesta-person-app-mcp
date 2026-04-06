# 🚀 Quick Start Guide - Neon Deployment

## Immediate Next Steps (5 minutes)

### 1. **Finish neonctl init** (in terminal that's running)
   - When asked about editors, just press **Enter** to continue
   - Complete authentication
   - Copy the connection string when shown

### 2. **Create `.env.local`**
   ```bash
   cp .env.example .env.local
   ```
   Paste your Neon connection string into `.env.local`

### 3. **Setup Database**
   ```bash
   pnpm db:migrate
   ```

### 4. **Test Locally**
   ```bash
   pnpm dev
   ```
   Visit http://localhost:3000 ✨

## Deploy to Vercel (5 minutes)

### 1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Migrate to Neon"
   git push
   ```

### 2. **Add to Vercel**
   - Dashboard → Environment Variables
   - Add: `DATABASE_URL` = `postgresql://...@host-pooler.neon.tech/...`
   - **Important:** Use `-pooler` endpoint!

### 3. **Done!** 
   Vercel auto-deploys on every push.

---

## Connection String Examples

### Local (`.env.local`)
```
postgresql://user:pass@abc12345.neon.tech/dbname
```

### Vercel (use pooler)
```
postgresql://user:pass@abc12345-pooler.neon.tech/dbname
```

---

## Common Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Add sample data
pnpm db:studio        # Open database GUI
pnpm lint             # Check code
```

---

## Verify Everything Works

- [ ] `.env.local` created with connection string
- [ ] `pnpm db:migrate` runs without errors
- [ ] `pnpm dev` starts successfully
- [ ] App loads at http://localhost:3000
- [ ] Search feature works
- [ ] Pushed to GitHub
- [ ] Vercel has DATABASE_URL set
- [ ] Vercel deployment is green ✅

---

## Need Help?

- **Neon Credentials:** https://console.neon.tech
- **Database GUI:** `pnpm db:studio`
- **Vercel Logs:** Dashboard → Deployments → View Logs
- **Setup Guide:** `docs/NEON_SETUP.md`
- **Full Docs:** `docs/DEPLOYMENT.md`

---

**Architecture:**
```
Your Code → Prisma Client → PostgreSQL Adapter → Neon Database
                                                  ↓
                                        (Auto-scales with traffic)
```

🎉 **You're using serverless PostgreSQL!**
