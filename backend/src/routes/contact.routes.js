import { Router } from "express";
import { addContact, contact, contacts, deleteContact, updateContact } from "../controllers/contact.controller.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";

export const contactRouter = Router()

contactRouter.post("/add-contact", verifyToken, addContact)
contactRouter.get("/contacts", verifyToken, contacts)
contactRouter.get("/contacts/:id", verifyToken, contact)
contactRouter.patch("/update-contact/:id", verifyToken, updateContact)
contactRouter.delete("/contact/:id", verifyToken, deleteContact)