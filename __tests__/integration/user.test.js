import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('deve ser possível cadastrar o usuário', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Brenda Matias',
        email: 'brenda@gmail.com',
        password_hash: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });
});
