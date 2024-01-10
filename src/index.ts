import "dotenv/config";
import express from 'express';
import cors from 'express';

import userRoute from './routes/user.router';
import { DBInit } from './db/mongo';



const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoute);

DBInit();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});