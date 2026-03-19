const request = require('supertest');
const app = require('../src/app');

// Integration Test example: Testing interactions between the Express application API layer
describe('Integration Testing - API Routes', () => {
    it('should handle comprehensive GET request to health endpoint', async () => {
        const response = await request(app).get('/api/health');
        
        // Validation of system-level behavior: status code + payload
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('status');
        expect(response.body.status).toBe('ok');
    });

    it('should return 404 for unknown endpoints', async () => {
        const response = await request(app).get('/api/unknown-endpoint');
        expect(response.statusCode).toBe(404);
    });
});
