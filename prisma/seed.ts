import { PrismaClient } from '@prisma/client';
import bills from './data/electricBill';
import companies from './data/electricCompany';
const prisma = new PrismaClient();
/**
 * Possible Arguments
 * --electric
 */
async function main() {
  console.log('Begin: Inserting Electric Seed Data 🔌');
  await prisma.playground.create({
    data: {
      name: 'TEST',
    },
  });
  console.log('Inserting Electric Companies');
  const companiesPromise = companies.map(async (data, index) => {
    console.log(`Inserting ${data.name} with ${index + 1}`);
    const result = await prisma.electricCompany.create({
      data,
    });
    console.log(`🟢 Done: ${result.name} with ${result.id}`);
    return result;
  });

  await Promise.all(companiesPromise).then(() => {
    console.log('Insert Electric Bills');
    bills.forEach(async (data, index) => {
      console.log(`Inserting ${data.date} with ${index + 1}`);
      const result = await prisma.electricBill.create({
        data,
      });
      console.log(`🟢 Done: ${result.date} with ${result.id}`);
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
