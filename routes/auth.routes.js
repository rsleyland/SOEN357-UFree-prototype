import express from "express";
const AuthRouter = express.Router();
import { registrationHandler, loginHandler, logoutHandler } from '../controllers/auth.controllers.js'

// Authentication routes
AuthRouter.post('/register', registrationHandler);
AuthRouter.post('/login', loginHandler);
AuthRouter.get('/logout', logoutHandler);

export { AuthRouter };