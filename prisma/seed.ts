import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database with sample people...');

  // Clear existing data
  await prisma.person.deleteMany();

  // Create sample people
  const people = await Promise.all([
    prisma.person.create({
      data: {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, San Francisco, CA 94102',
        bio: 'Software engineer with 5+ years of experience in full-stack development.',
      },
    }),
    prisma.person.create({
      data: {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        phone: '+1 (555) 234-5678',
        address: '456 Oak Ave, New York, NY 10001',
        bio: 'Product manager focused on user experience and growth.',
      },
    }),
    prisma.person.create({
      data: {
        name: 'Carol Davis',
        email: 'carol.davis@example.com',
        phone: '+1 (555) 345-6789',
        address: '789 Pine Rd, Austin, TX 78701',
        bio: 'UX/UI designer passionate about accessibility and inclusive design.',
      },
    }),
    prisma.person.create({
      data: {
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        phone: '+1 (555) 456-7890',
        address: '321 Elm St, Seattle, WA 98101',
        bio: 'DevOps engineer specializing in cloud infrastructure and CI/CD.',
      },
    }),
    prisma.person.create({
      data: {
        name: 'Emma Brown',
        email: 'emma.brown@example.com',
        phone: '+1 (555) 567-8901',
        address: '654 Maple Dr, Boston, MA 02101',
        bio: 'Data scientist working on machine learning and analytics.',
      },
    }),
    prisma.person.create({
      data: {
        name: 'Frank Taylor',
        email: 'frank.taylor@example.com',
        phone: '+1 (555) 678-9012',
        address: '987 Cedar Ln, Los Angeles, CA 90001',
        bio: 'Frontend developer specializing in React and TypeScript.',
      },
    }),
    prisma.person.create({
      data: {
        name: 'Grace Lee',
        email: 'grace.lee@example.com',
        phone: '+1 (555) 789-0123',
        address: '159 Birch St, Denver, CO 80201',
        bio: 'Backend engineer focused on scalable systems and databases.',
      },
    }),
    prisma.person.create({
      data: {
        name: 'Henry Chen',
        email: 'henry.chen@example.com',
        phone: '+1 (555) 890-1234',
        address: '753 Spruce Ave, Chicago, IL 60601',
        bio: 'Security engineer passionate about cybersecurity best practices.',
      },
    }),
  ]);

  console.log(`✅ Successfully seeded ${people.length} people`);
  console.log(`📊 Sample data:`, people.map(p => p.name).join(', '));
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
