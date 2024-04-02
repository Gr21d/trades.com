const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetSupportQueriesTable() {
  await prisma.supportQuery.deleteMany({});
}

resetSupportQueriesTable()
  .then(() => console.log('SupportQueries table reset successfully'))
  .catch(error => console.error('Error resetting SupportQueries table:', error))
  .finally(async () => {
    await prisma.$disconnect();
  });
