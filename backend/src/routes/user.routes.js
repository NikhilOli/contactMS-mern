import { dashboard, loginUser, registerUser } from "../controllers/auth.controllers.js";
import { Router } from "express";
import { body} from 'express-validator';
import verifyToken from "../middlewares/verifyToken.middleware.js";


export const router = Router();


router.post("/register", [
    // Name must not be empty
    body('name').notEmpty().withMessage('Name is required'),
    // Email must be valid and not empty
    body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    // Password must be at least 6 characters long
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], registerUser)

router.post("/login", loginUser)

router.get("/dashboard", verifyToken, dashboard)