import express from "express";
import path from "path";
import imageRoutes from "./routes/image";
import fs from "fs";
// import routes from "./routes/index";
const app = express();
const port = 3000;

app.use(imageRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Not found!</h1>");
});

app.listen(port, () => {
  console.log(`.....listen on port ${port}`);
});

export default app;
