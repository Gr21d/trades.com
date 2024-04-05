const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Insert a User
  async function deleteAllTransactions() {
    try {
      await prisma.$queryRaw`DELETE FROM "Transactions"`;
      console.log('All rows deleted from the "Transactions" table.');
    } catch (error) {
      console.error('Error deleting rows from "Transactions" table:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  deleteAllTransactions();
}

main()
  .catch(e => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
