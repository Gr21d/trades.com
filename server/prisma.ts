import { PrismaClient } from '@prisma/client'

// To avoid creating multiple instances of Prisma Client in development, 
// we can create a singleton function that returns the same instance of Prisma Client every time it's called.

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
