/**
 * tests that include side effects like database manipulation and API calls
 */
const request = require('supertest');
const app = require('../../app');

const factories = require('../factories');

const truncate = require('../utils/truncate')

// like category of tests
describe('Autentication', () => {

    beforeEach(async () => {
        await truncate();
    });

    // a single test
    /*it('should receive JWT token when authenticated with valid credentials',() => {

    });*/

    it('should authenticated with valid credentials', async () => {
        const created_user = await factories.create('User', {
            password: '123'
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: created_user.email,
                password: '123'
            });

        console.log('user authenticated', response.body);
        expect(response.status).toBe(200);
    });

    it('should not authenticate with INVALID credentials', async () => {
        const created_user = await factories.create('User', {
            password: '123'
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: created_user.email,
                password: 'x123'
            });

        expect(response.status).toBe(401);
    });


    it('should not authenticate when user does not exist', async () => {
        const response = await request(app)
            .post('/sessions')
            .send({
                email: 'user_ghost@getnada.com',
                password: 'pass'
            });

        expect(response.status).toBe(401);
    });

    it('should return a JWT token when successfully authenticated', async () => {
        const created_user = await factories.create('User', {
            password: '123'
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: created_user.email,
                password: '123'
            });

        expect(response.body).toHaveProperty('token');
    });

    it('should be able to access dasboard route when user is authenticated', async () => {
        const created_user = await factories.create('User', {
            password: '123'
        });

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${created_user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should NOT be able to access dasboard route when user WITHOUT JWT Token', async () => {
        const response = await request(app)
            .get('/dashboard');

        expect(response.status).toBe(401);
    });

    it('it should not be able to access private routes with invalid JWT Token', async () => {
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ABCDEFGH`);

        expect(response.status).toBe(401);
    });
});
