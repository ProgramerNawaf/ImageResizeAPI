import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const imageFunction = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const filename = req.query.filename;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  //handeled all errors in 1-input is not provided 2-input type invalid 3-file name is invalid

  //1-first checking all inputs are provided
  if (filename === null || height === null || width === null) {
    return res.status(400).send('Enter all required parameters!');
  }
  //2- checking if height and width are number
  if (isNaN(width) || isNaN(height))
    return res.status(400).send('Height and Width must be numbers!');
  const newName = `${filename}_${height}_${width}`;

  const imagePath = path.join(
    __dirname,
    '../../assets/full',
    `${filename}.jpg`,
  );
  const imagePath2 = path.join(
    __dirname,
    '../../assets/thumb',
    `${newName}.jpg`,
  );
  /*3-here we first check if the filename entered exists in full folder if it does we check the
  image with the resized parameters exists in thumb folder if it does we return it if it doesent we resize the image
  and send the newFile to thumb
  if file input is invalid we handle it in line 38
  */
  if (fs.existsSync(imagePath)) {
    if (fs.existsSync(imagePath2)) return res.sendFile(imagePath2);
    await sharp(imagePath).resize(width, height).toFile(imagePath2);
    return res.sendFile(imagePath2);
  } else {
    return res.status(404).send('Image not found');
  }
};

export default imageFunction;
