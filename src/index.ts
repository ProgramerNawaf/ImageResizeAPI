import { Request, Response } from 'express';
('express');
import express from 'express';

import imageRoutes from './routes/image';

const app = express();
const port = 3000;

//all functions and parameters have return type now thanks for the advice :)

app.use(imageRoutes);

app.use((req: Request, res: Response): void => {
  res.status(404).send('<h1>Not found!</h1>');
});

app.listen(port, () => {
  console.log(`.....listen on port ${port}`);
});

export default app;
