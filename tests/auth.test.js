import request from 'supertest';
import app from '../src/index.js';
import { clearDatabase, validateUserObject } from './utils/db.js';

beforeEach(async () => {
    await clearDatabase();
});

describe('🔐 Auth', () => {
    it('should register a user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            name: 'tester',
            email: 'test@example.com',
            password: '123456',
        });

        console.log({ body: res.body })

        expect(res.statusCode).toBe(201);
        validateUserObject(res.body)
    });

    it('should not allow duplicate email', async () => {
        await request(app).post('/api/auth/register').send({
            name: 'user1',
            email: 'test@example.com',
            password: '123456',
        });

        const res = await request(app).post('/api/auth/register').send({
            name: 'user2',
            email: 'test@example.com',
            password: '123456',
        });

        expect(res.statusCode).toBe(400);
    });

    it('should login and return a token', async () => {
        await request(app).post('/api/auth/register').send({
            name: 'user',
            email: 'user@example.com',
            password: '123456',
        });

        const res = await request(app).post('/api/auth/login').send({
            email: 'user@example.com',
            password: '123456',
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('id');
    });

    it('should fail login with wrong password', async () => {
        await request(app).post('/api/auth/register').send({
            name: 'bad',
            email: 'bad@example.com',
            password: '123456',
        });

        const res = await request(app).post('/api/auth/login').send({
            email: 'bad@example.com',
            password: 'wrong',
        });

        expect(res.statusCode).toBe(500); // Your API returns 500 for invalid credentials
    });
});
