import express from "express";
import  { RegisterController } from "../controllers";

const router = express.Router();



router.post('/register' , RegisterController.register)



export default router;