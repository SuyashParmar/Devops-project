const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
    it('should return 200 and status ok or warning', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toEqual(200);
        expect(['ok', 'warning']).toContain(res.body.status);
    });
});

describe('E-Commerce Core Logic', () => {
    it('should successfully deliver an array of products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should process a mocked checkout gracefully', async () => {
        const res = await request(app)
            .post('/api/checkout')
            .send({ items: [{title: 'Test', price: 100, quantity: 1}], total: 100 });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
    });
});
