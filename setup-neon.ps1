# Neon Database Setup Script (Windows PowerShell)
# This script helps complete the Neon database setup for the person-search application

Write-Host "🚀 Neon Database Setup Script" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Creating .env.local from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ Created .env.local" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  Important: Edit .env.local and add your Neon connection string" -ForegroundColor Red
    Write-Host "   Connection string format: postgresql://[user]:[password]@[host].neon.tech/[database]" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Press Enter after updating .env.local..."
    Read-Host
}

Write-Host "🔧 Setting up Prisma..." -ForegroundColor Cyan
Write-Host ""

# Generate Prisma Client
Write-Host "1️⃣  Generating Prisma Client..." -ForegroundColor Yellow
pnpm db:generate
Write-Host "✅ Prisma Client generated" -ForegroundColor Green
Write-Host ""

# Run migrations
Write-Host "2️⃣  Running database migrations..." -ForegroundColor Yellow
pnpm db:migrate
Write-Host "✅ Database migrations completed" -ForegroundColor Green
Write-Host ""

# Optional: Seed database
Write-Host "Would you like to seed the database with sample data? (y/n)" -ForegroundColor Cyan
$seedResponse = Read-Host
if ($seedResponse -eq "y" -or $seedResponse -eq "Y") {
    Write-Host "3️⃣  Seeding database..." -ForegroundColor Yellow
    pnpm db:seed
    Write-Host "✅ Database seeded" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start development: pnpm dev" -ForegroundColor Gray
Write-Host "2. Open http://localhost:3000" -ForegroundColor Gray
Write-Host "3. View database: pnpm db:studio" -ForegroundColor Gray
Write-Host ""
Write-Host "For Vercel deployment:" -ForegroundColor Cyan
Write-Host "1. Set DATABASE_URL in Vercel environment variables" -ForegroundColor Gray
Write-Host "2. Use pooled endpoint: postgresql://[user]:[password]@[host]-pooler.neon.tech/[database]" -ForegroundColor Gray
Write-Host "3. Push to GitHub to deploy" -ForegroundColor Gray
