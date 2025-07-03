// src/lib/prisma.js
const { PrismaClient } = require('@prisma/client');

let prisma;

// Initialize Prisma Client with error handling
function initPrisma() {
    try {
        if (process.env.NODE_ENV === 'production') {
            prisma = new PrismaClient({
                log: ['error'],
            });
        } else {
            if (!global.prisma) {
                global.prisma = new PrismaClient({
                    log: ['query', 'info', 'warn', 'error'],
                });
            }
            prisma = global.prisma;
        }
        return prisma;
    } catch (error) {
        console.error('Failed to initialize Prisma Client:', error);
        throw error;
    }
}

// Initialize immediately
prisma = initPrisma();

module.exports = { prisma };