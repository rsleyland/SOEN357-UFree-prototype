import express from "express";
import 'dotenv/config';
import './db_connect.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

import { AuthRouter } from './routes/auth.routes.js';
app.use("/auth", AuthRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
