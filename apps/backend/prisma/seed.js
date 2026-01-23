const path = require('node:path');
const dotenv = require('dotenv');
const { PrismaClient, Role, NewsStatus } = require('@prisma/client');
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

  const newsSeed = [
    {
      title: 'Semana de sociedades cientificas',
      slug: 'semana-sociedades-cientificas',
      summary: 'Calendario general, jurados y lineamientos oficiales.',
      content:
        'Se publica el calendario general de la semana de sociedades cientificas con fechas por departamentos, jurados y sedes. Consulte el cronograma actualizado y prepare la documentacion requerida.',
      publishedAt: new Date('2026-01-20T09:00:00Z'),
    },
    {
      title: 'Simulacro de ingreso',
      slug: 'simulacro-de-ingreso',
      summary: 'Cronograma por grupos y recursos disponibles.',
      content:
        'Se realizará el simulacro de ingreso con horarios por grupo y orientaciones para el uso de los recursos disponibles. Verifique el horario de su aula y llegue con puntualidad.',
      publishedAt: new Date('2026-01-18T14:30:00Z'),
    },
    {
      title: 'Actualizacion de horario',
      slug: 'actualizacion-de-horario',
      summary: 'Nuevo bloque de matutino agregado en primer turno.',
      content:
        'Se añade un bloque de matutino en el primer turno. Revise su horario actualizado en el portal institucional para evitar solapamientos.',
      publishedAt: new Date('2026-01-16T08:15:00Z'),
    },
    {
      title: 'Reunion de orientacion academica',
      slug: 'reunion-orientacion-academica',
      summary: 'Encuentro para estudiantes y profesores.',
      content:
        'La reunion de orientacion academica abordara el cierre de semestre, prioridades y seguimiento de indicadores. Se recomienda la asistencia de estudiantes delegados y profesores.',
      publishedAt: new Date('2026-01-14T10:00:00Z'),
    },
  ];

  for (const item of newsSeed) {
    await prisma.news.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        summary: item.summary,
        content: item.content,
        status: NewsStatus.PUBLISHED,
        publishedAt: item.publishedAt,
        authorId: user.id,
      },
      create: {
        title: item.title,
        slug: item.slug,
        summary: item.summary,
        content: item.content,
        status: NewsStatus.PUBLISHED,
        publishedAt: item.publishedAt,
        authorId: user.id,
      },
    });
  }

  console.log('Seed: noticias iniciales publicadas.');
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
