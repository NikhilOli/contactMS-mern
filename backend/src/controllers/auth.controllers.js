import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';



const registerUser = async (req, res) => {

    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({message: "User already exists"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = User.create({
            name,
            email,
            password: hashPassword
        });
        res.status(201).json({message: "User created successfully", newUser})

    } catch (error) {
        console.log("Error in registering user");
    }
}

const loginUser = async (req, res) => {

    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.json({message: "No users found"})
        }

        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword) {
            return res.status(400).json({message: "Password mismatch"})
        }
        const token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY, {expiresIn: "1d"})

        const userData = {...user._doc, password: undefined}

        res.status(200).json({message: "Login successful", userData, token})

    } catch (error) {
        console.log("Error in logging user", error);
    }
}

const dashboard = async (req, res) => {
    const {id, email } = req.user;
    const userData = await User.findOne({email})
    if (!userData) {
        res.status(403).json({message: "User not found"})
    }
    res.status(200).json({
        message: "Dashboard data retrieved successfully",
        user: { id, email },
        userData 
    });
}


export {registerUser, loginUser, dashboard};