import 'dotenv/config';
import prisma from './prisma/client';
import argon2 from 'argon2';

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME || 'admin';
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!password || password.trim() === '') {
    console.warn('No SEED_ADMIN_PASSWORD was provided. Skipping seed creation.');
    return;
  }

  const hostPassword = await argon2.hash(password);

  const host = await prisma.host.upsert({
    where: { username },
    update: { passwordHash: hostPassword },
    create: {
      username,
      passwordHash: hostPassword,
    },
  });

  console.log({ host: { id: host.id, username: host.username } });
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
