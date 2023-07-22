import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const imageFunction = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const filename = req.query.filename;
  let width = req.query.width;
  let height = req.query.height;
  console.log(width + '--------' + height);
  //handeled all errors in 1-input is not provided 2-input type invalid for height and width  3-file name is invalid

  //1-first checking all inputs are provided
  if (!filename || !height || !width) {
    return res.status(400).send('Enter all required parameters!');
  }

  //2- checking if height and width are a postive number
  if (!/^\d+$/.test(width as string) || !/^\d+$/.test(height as string))
    return res.status(400).send('Height and Width must be postive numbers!');

  if (parseInt(width as string) <= 0 || parseInt(height as string) <= 0)
    return res.status(400).send('Height and Width must be postive numbers!');

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

  if (
    await imageResize(
      imagePath,
      imagePath2,
      parseInt(height as string),
      parseInt(width as string),
    )
  )
    res.sendFile(imagePath2);
  else res.status(404).send('image not found!');
};

const imageResize = async (
  imagePath: string,
  imagePath2: string,
  height: number,
  width: number,
): Promise<boolean> => {
  /*3-here we first check if the filename entered exists in full folder if it does we check the
  image with the resized parameters exists in thumb folder if it does we return it if it doesent we resize the image
  and send the newFile to thumb
  if file input is invalid we handle it in line 38
  */
  if (fs.existsSync(imagePath)) {
    if (fs.existsSync(imagePath2)) return true;
    await sharp(imagePath).resize(width, height).toFile(imagePath2);
    return true;
  } else {
    return false;
  }
};

export { imageFunction, imageResize };
