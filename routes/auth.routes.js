import express from "express";
const AuthRouter = express.Router();
import { registrationHandler, loginHandler } from '../controllers/auth.controllers.js'

AuthRouter.post('/register', registrationHandler);
AuthRouter.post('/login', loginHandler);

export { AuthRouter };