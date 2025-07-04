import request from 'supertest';
import app from '../src/index.js';
import { clearDatabase, createUser, loginUser, validateNoteObject } from './utils/db.js';

let token, id;

beforeAll(async () => {
    await clearDatabase();

    await createUser(app, {
        name: 'normal',
        email: 'user@example.com',
        password: '123456',
    });

    const loginRes = await loginUser(app, {
        email: 'user@example.com',
        password: '123456',
    });

    token = loginRes.body.token;
    id = loginRes.body.id;
});

describe('📝 Notes API', () => {
    it('should create a new note', async () => {
        const res = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    "title": "My Important Note",
                    "content": "This is the content of my note",
                    "userId": id
                }
            );

        expect(res.statusCode).toBe(201);
        validateNoteObject(res.body);
        expect(res.body.title).toBe("My Important Note");
        expect(res.body.content).toBe("This is the content of my note");
        expect(res.body.userId).toBe(id);
    });

    it('should fetch user notes', async () => {
        // Create a note first
        await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Test Note",
                content: "Test content",
                userId: id
            });

        const res = await request(app)
            .get('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .set('id', `id ${id}`); // Based on your API expecting user ID in headers

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        // Validate each note in the array
        res.body.forEach(note => {
            validateNoteObject(note);
        });
    });
    it('should update a note', async () => {
        const create = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Old Title',
                content: 'Old content',
                userId: id
            });

        const noteId = create.body.id;

        const res = await request(app)
            .put(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'New Title',
                content: 'Updated content'
            });

        expect(res.statusCode).toBe(200);
        validateNoteObject(res.body);
        expect(res.body.title).toBe('New Title');
        expect(res.body.content).toBe('Updated content');
    });

    it('should delete a note', async () => {
        const create = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'ToDelete',
                content: 'bye',
                userId: id
            });

        const noteId = create.body.id;

        const res = await request(app)
            .delete(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });
    it('should not allow unauthenticated access', async () => {
        const res = await request(app).get('/api/notes');

        expect(res.statusCode).toBe(403); // Your middleware returns 403 for missing token
    });
});

