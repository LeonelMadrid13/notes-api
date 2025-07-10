// src/lib/prisma.js
let prisma;
let isInitialized = false;

async function getPrismaClient() {
    if (prisma && isInitialized) {
        return prisma;
    }

    try {
        // Dynamic import to handle initialization issues
        const { PrismaClient } = await import('@prisma/client');

        if (process.env.NODE_ENV === 'production') {
            prisma = new PrismaClient({
                log: ['error'],
            });
        } else {
            if (!global.prisma) {
                global.prisma = new PrismaClient({
                    log: ['warn', 'error'],
                });
            }
            prisma = global.prisma;
        }

        // Test the connection
        await prisma.$connect();
        isInitialized = true;

        return prisma;
    } catch (error) {
        console.error('Prisma Client initialization failed:', error);
        throw new Error('Database connection failed. Please try again later.');
    }
}

// Graceful shutdown
process.on('beforeExit', async () => {
    if (prisma) {
        await prisma.$disconnect();
    }
});

export { getPrismaClient };