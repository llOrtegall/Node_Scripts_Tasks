import "dotenv/config";
import express from 'express';
import cors from 'express';

import userRoute from './infrastructure/routes/user.route';
import { DBInit } from './infrastructure/db/mongo';



const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoute);

DBInit();

app.listen(PORT, () => {
  console.log(`Server User running at http://localhost:${PORT}`);
});