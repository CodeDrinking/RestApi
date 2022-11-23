import express from "express";
import  { loginController, RegisterController ,UserController ,RefreshController  } from "../controllers";
import ProductController from "../controllers/ProductController";
import auth from "../middleware/auth";
import admin from "../middleware/admin";

const router = express.Router();



router.post('/register' , RegisterController.register)
router.post('/login' , loginController.login)
router.get('/me',auth , UserController.me)
router.post('/refresh' ,RefreshController.refresh)
router.post('/logout' ,auth ,loginController.logout) 

router .post('/products', [auth , admin] , ProductController.store)
router.put('/products/:id' , [auth , admin] , ProductController.update)
router.delete('/products/:id' , [auth , admin] , ProductController.destroy)
router.get('/products'  , ProductController.index);
router.get('/products/:id'  , ProductController.show);







export default router;