import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import router from './routes/contact-routes';
dotenv.config()

const PORT = process.env.PORT || 5000;
const URL = process.env.URL || '';

const app: Application = express();
app.use(cors({ origin: '*' }))
app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js!")
});

mongoose.set("strictQuery", true);
mongoose
  .connect(URL)
  .then((res) => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (): void => {
  console.log(`Server Running here  https://localhost:${PORT}`);
});

app.use(router);
