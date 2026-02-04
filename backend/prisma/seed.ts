import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create all offices
  const office1 = await prisma.office.upsert({
    where: { code: 'BKK-AREA1' },
    update: {},
    create: {
      code: 'BKK-AREA1',
      name: 'สำนักงานขนส่งเขตพื้นที่ 1 (บางขุนเทียน)',
    },
  });

  const office2 = await prisma.office.upsert({
    where: { code: 'BKK-AREA2' },
    update: {},
    create: {
      code: 'BKK-AREA2',
      name: 'สำนักงานขนส่งเขตพื้นที่ 2 (ตลิ่งชัน)',
    },
  });

  const office3 = await prisma.office.upsert({
    where: { code: 'BKK-AREA3' },
    update: {},
    create: {
      code: 'BKK-AREA3',
      name: 'สำนักงานขนส่งเขตพื้นที่ 3 (พระโขนง)',
    },
  });

  const office4 = await prisma.office.upsert({
    where: { code: 'BKK-AREA4' },
    update: {},
    create: {
      code: 'BKK-AREA4',
      name: 'สำนักงานขนส่งเขตพื้นที่ 4 (มีนบุรี)',
    },
  });

  const office5 = await prisma.office.upsert({
    where: { code: 'BKK-AREA5' },
    update: {},
    create: {
      code: 'BKK-AREA5',
      name: 'สำนักงานขนส่งเขตพื้นที่ 5 (จตุจักร)',
    },
  });

  // Create work groups for all offices
  const offices = [office1, office2, office3, office4, office5];

  for (const office of offices) {
    // Create work group for each office
    const workGroup = await prisma.workGroup.upsert({
      where: { id: office.id }, // Using office.id as workGroup id for simplicity
      update: {},
      create: {
        name: 'งานทะเบียน',
        officeId: office.id,
        description: 'งานทะเบียนรถและป้ายทะเบียน',
      },
    });

    // No default service types - users will create their own
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

