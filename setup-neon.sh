#!/bin/bash
# Neon Database Setup Script
# This script helps complete the Neon database setup for the person-search application

set -e

echo "🚀 Neon Database Setup Script"
echo "=============================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  Important: Edit .env.local and add your Neon connection string"
    echo "   Connection string format: postgresql://[user]:[password]@[host].neon.tech/[database]"
    echo ""
    echo "Press Enter after updating .env.local..."
    read
fi

echo "🔧 Setting up Prisma..."
echo ""

# Generate Prisma Client
echo "1️⃣  Generating Prisma Client..."
pnpm db:generate
echo "✅ Prisma Client generated"
echo ""

# Run migrations
echo "2️⃣  Running database migrations..."
pnpm db:migrate
echo "✅ Database migrations completed"
echo ""

# Optional: Seed database
echo "Would you like to seed the database with sample data? (y/n)"
read -r SEED_RESPONSE
if [ "$SEED_RESPONSE" = "y" ] || [ "$SEED_RESPONSE" = "Y" ]; then
    echo "3️⃣  Seeding database..."
    pnpm db:seed
    echo "✅ Database seeded"
    echo ""
fi

echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Start development: pnpm dev"
echo "2. Open http://localhost:3000"
echo "3. View database: pnpm db:studio"
echo ""
echo "For Vercel deployment:"
echo "1. Set DATABASE_URL in Vercel environment variables"
echo "2. Use pooled endpoint: postgresql://[user]:[password]@[host]-pooler.neon.tech/[database]"
echo "3. Push to GitHub to deploy"
