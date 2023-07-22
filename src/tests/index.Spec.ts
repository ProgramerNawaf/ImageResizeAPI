import app from '../index';
import supertest from 'supertest';
import sharp from 'sharp';
import path from 'path';
import { imageResize } from '../controller/imageController';

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

  it('Testing if imageResize function with correct paths and parameters work', () => {
    imageResize(
      path.join(__dirname, '../../assets/full', `benzema.jpg`),
      path.join(__dirname, '../../assets/full', `benzema.jpg_500_500`),
      500,
      500,
    );
  });
});
