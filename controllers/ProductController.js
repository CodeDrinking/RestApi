import Product from "../models/product";
import multer from "multer"
// import { Path } from "mongoose";
import path from 'path';
import CustomErrorHandler from "../Services/CustomErrorHandler"
import fs from "fs"
import Joi from "joi";
import ProductSchema from "../validators/productValidators";

const storage =multer.diskStorage({
    destination : (req ,file , cb) => cb(null ,'uploads/'),
    filename : (req , file , cb) => {
        const uniqueName= ` ${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null , uniqueName)
    }
})

const handleMultipartData = multer({storage, limits: {fileSize: 1000000 * 5}, }).single('image')
const ProductController ={
    async store( req , res , next){
        //multipart  form data 
        handleMultipartData(req ,res , async (err) => {
            if(err){
                return next(CustomErrorHandler.serverError(err.message))
            }
            console.log(req.file);
            const filePath =req.file.path;

            //validation
            const {error} = ProductSchema.validate(req.body);

    
            if(error){
                
                //if validation get failed after image upload ... then we can straight away delete the image
                //delete the image 
                //rootfolder/uploads/filename.png
                fs.unlink (`${appRoot}/${filePath}`, (err)=>{
                if (err) {
                        return next(
                            CustomErrorHandler.serverError(err.message)
                        );
                    }
                    
                })
                return next(error) 
            }
            const { name, price, size } = req.body;
            let document;
            try {
                document = await Product.create({
                    name,
                    price,
                    size,
                    image: filePath,
                });
            }
            catch(err){
                return next (err)
            }

            res.status(201).json({document});
        })
    },
     update( req , res , next){
        handleMultipartData(req ,res , async (err) => {
            if(err){
                return next(CustomErrorHandler.serverError(err.message))
            }
            console.log(req.file);
            let filePath;
            if(req.file){
               filePath =req.file.path;
            }

            //validation
            const {error} = ProductSchema.validate(req.body);

    
            if(error){
                
                //if validation get failed after image upload ... then we can straight away delete the image
                //delete the image 
                //rootfolder/uploads/filename.png
                if(req.file){
                    fs.unlink (`${appRoot}/${filePath}`, (err)=>{
                        if (err) {
                                return next(
                                    CustomErrorHandler.serverError(err.message)
                                );
                            }
                            
                    })
                }
 
                return next(error) 
            }
            const { name, price, size } = req.body;
            let document;
            try {
                document = await Product.findOneAndUpdate({_id : req.params.id},{
                    name,
                    price,
                    size,
                    ...(req.file &&  {image : filePath})
                } ,{new:true}); //updated data will be pass in document
                console.log(document);
            }
            catch(err){
                return next (err)
            }

            res.status(201).json({document});
        })
    },

    async destroy( req , res , next){
        const document = await Product.findOneAndDelete({_id : req.params.id});
        if(!document){
            return next(new Error("Nothing to delete"))
        }
        console.log(document);
        //image delete
        const imagePath = document._doc.image; //_doc for not to call getter ...app root by default database se nahi aayega ..to avoid approot/localhost...
        console.log(imagePath);
        fs.unlink(`${appRoot}/${imagePath}`,(err) =>{
            if(err){
                return next(CustomErrorHandler.serverError())
            }
            
        });
        res.json({document})
       
    },


    async index (req , res , next){

        let documents ;
         try{
            documents =await Product.find({}).select('-createdAt -updatedAt').sort({_id:-1})
         }
         catch(err){
            return next(CustomErrorHandler.serverError());
         }
         return res.json(documents)
    },

    async show(req , res , next){
        let product;
        try{
            product = await Product.findById({_id:req.params.id})
        }
        catch(err){
            return next(new Error ("No Product to find"))
        }
        return res.json(product)

    }

}
export default ProductController;
