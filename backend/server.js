import express from "express";
import 'dotenv/config';
import './db_connect.js';
const app = express();

app.use(express.json());

import { AuthRouter } from './routes/auth.routes.js';
app.use("/auth", AuthRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
