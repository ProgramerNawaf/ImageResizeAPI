import app from '../index';
import supertest from 'supertest';
import sharp from 'sharp';
import path from 'path';

const request = supertest(app);

describe('Testing Endpoints', () => {
  it('Testing if endpoint  exists', async () => {
    await request
      .get('/image?filename=benzema&&width=500&&height=500')
      .expect(200);
  });
  it('Testing if endpoint dosent exist', async () => {
    await request.get('/resize').expect(404);
  });

  it('Testing if function with correct paths and parameters work', () => {
    sharp(path.join(__dirname, '../../assets/full', `benzema.jpg`))
      .resize(500, 500)
      .toFile(path.join(__dirname, '../../assets/full', `benzema.jpg_500_500`));
  });
});
