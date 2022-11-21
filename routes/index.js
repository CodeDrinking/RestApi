import express from "express";
import  { loginController, RegisterController ,UserController ,RefreshController } from "../controllers";
import auth from "../middleware/auth";

const router = express.Router();



router.post('/register' , RegisterController.register)
router.post('/login' , loginController.login)
router.get('/me',auth , UserController.me)
router.post('/refresh' ,RefreshController.me)



export default router;