import request from 'supertest';
import app from '../src/index.js';
import { clearDatabase, createUser, loginUser, createAdmin } from './utils/db.js';

let adminToken, userToken, userId;

beforeAll(async () => {
    await clearDatabase();

    // Create admin using helper function
    await createAdmin({
        name: 'admin',
        email: 'admin@example.com',
        password: '123456',
    });

    // Create regular user via API
    const userResponse = await createUser(app, {
        name: 'normal',
        email: 'user@example.com',
        password: '123456',
    });

    // Login admin via API
    const adminLoginResponse = await loginUser(app, {
        email: 'admin@example.com',
        password: '123456',
    });

    // Login user via API
    const userLoginResponse = await loginUser(app, {
        email: 'user@example.com',
        password: '123456',
    });

    adminToken = adminLoginResponse.body.token;
    adminId = adminLoginResponse.body.id;

    userToken = userLoginResponse.body.token;
    userId = userLoginResponse.body.id;
});

describe('👥 Users', () => {
    it('should allow user to fetch their own profile', async () => {
        const res = await request(app)
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('username');
    });

    it('should allow admin to fetch all users', async () => {
        const res = await request(app)
            .get('/api/users')
            .send({
                id: adminId
            })
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should forbid normal user from fetching all users', async () => {
        const res = await request(app)
            .get('/api/users')
            .send({ id: userId })
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toBe(403);
    });
});
