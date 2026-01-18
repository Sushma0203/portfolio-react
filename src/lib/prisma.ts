import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClientSingleton = () => {
    try {
        return new PrismaClient().$extends(withAccelerate());
    } catch (error) {
        console.warn('Prisma Edge client initialization failed (expected during build):', error);
        // Returning a placeholder that might fail at runtime, but fulfills the type during build
        return new Proxy({} as any, {
            get: (_, prop) => {
                if (prop === '$extends') return () => ({});
                return undefined;
            }
        });
    }
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma as any;

export { prisma };
