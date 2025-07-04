import { PrismaClient } from '@prisma/client';
import request from 'supertest';

export const prisma = new PrismaClient();

export async function clearDatabase() {
    await prisma.note.deleteMany();
    await prisma.user.deleteMany();
}

// Helper function to create a user via API
export async function createUser(app, userData) {
    const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

    return response;
}

// Helper function to login a user via API
export async function loginUser(app, credentials) {
    const response = await request(app)
        .post('/api/auth/login')
        .send(credentials);

    return response;
}

// Helper function to create a note via API
export async function createNote(app, token, noteData) {
    const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(noteData);

    return response;
}

// Helper function to create an admin user (this one can use direct DB access 
// since admin creation might not be available via API)
export async function createAdmin(adminData) {
    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    const admin = await prisma.user.create({
        data: {
            ...adminData,
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

    return admin;
}

// Validation helpers for API responses
export function validateNoteObject(note) {
    expect(note).toHaveProperty('id');
    expect(note).toHaveProperty('title');
    expect(note).toHaveProperty('content');
    expect(note).toHaveProperty('userId');
    expect(note).toHaveProperty('createdAt');
    expect(note).toHaveProperty('updatedAt');

    expect(typeof note.id).toBe('string');
    expect(typeof note.title).toBe('string');
    expect(typeof note.content).toBe('string');
    expect(typeof note.userId).toBe('string');
    expect(typeof note.createdAt).toBe('string');
    expect(typeof note.updatedAt).toBe('string');

    // Validate date strings
    expect(new Date(note.createdAt).toString()).not.toBe('Invalid Date');
    expect(new Date(note.updatedAt).toString()).not.toBe('Invalid Date');
}

export function validateUserObject(user) {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('role');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');

    expect(typeof user.id).toBe('string');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(['USER', 'ADMIN'].includes(user.role)).toBe(true);
    expect(typeof user.createdAt).toBe('string');
    expect(typeof user.updatedAt).toBe('string');

    // Should not include password in response
    expect(user).not.toHaveProperty('password');
}
