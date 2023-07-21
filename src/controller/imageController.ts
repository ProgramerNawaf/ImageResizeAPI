import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const imageFunction = async (req: Request, res: Response) => {
  //   console.log(req.query);

  const filename = req.query.filename;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (filename === null || height === null || width === null) {
    return res.status(400).send("Enter all required parameters");
  }

  const newName = `${filename}_${height}_${width}`;
  console.log(newName + "ff");

  const imagePath = path.join(
    __dirname,
    "../../assets/full",
    `${filename}.jpg`,
  );
  const imagePath2 = path.join(
    __dirname,
    "../../assets/thumb",
    `${newName}.jpg`,
  );

  if (fs.existsSync(imagePath)) {
    if (fs.existsSync(imagePath2)) return res.sendFile(imagePath2);
    await sharp(imagePath).resize(width, height).toFile(imagePath2);
    return res.sendFile(imagePath2);
  } else {
    console.log("no");
  }
};

export default imageFunction;
