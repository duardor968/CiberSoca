const path = require('node:path');
const dotenv = require('dotenv');
const { PrismaClient, Role } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definido. Revisa apps/backend/.env');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  const username = 'admin';
  const password = 'hola12!@';
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { username },
    update: {
      passwordHash,
      fullName: 'Administrador',
      isActive: true,
    },
    create: {
      username,
      passwordHash,
      fullName: 'Administrador',
      isActive: true,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_role: {
        userId: user.id,
        role: Role.ADMIN,
      },
    },
    update: {},
    create: {
      userId: user.id,
      role: Role.ADMIN,
    },
  });

  console.log(`Seed: usuario '${username}' listo con rol ADMIN.`);
}

main()
  .catch((error) => {
    console.error('Seed error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
