import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request } from 'express';
import expressWs from 'express-ws';
import mongoose from 'mongoose';
import { WebSocket } from 'ws';
import router from './routes/contact-routes';
dotenv.config();

const PORT = process.env.PORT || 5000;
const URL = process.env.URL || '';

const { app, getWss } = expressWs(express());
export const aWss = getWss();

app.use(cors({}));
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose
  .connect(URL)
  .then((res) => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (): void => {
  console.log(`Server Running here  https://localhost:${PORT}`);
});

app.use(router);

app.ws('/', (ws: WebSocket, req: Request): void => {});
