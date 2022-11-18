import Joi from "joi";
import { User } from "../../models";
import CustomErrorHandler from "../../Services/CustomErrorHandler";
import bcrypt from 'bcrypt';
import jwtService from "../../Services/jwtService";

const RegisterController ={
    async register (req , res , next){





        const registerSchema = Joi.object({
            name :  Joi.string().min(3).max(30).required(),
            email :  Joi.string().email().required(),
            password :  Joi.string().required(),
            repeat_password :  Joi.ref('password')
        });

        const {error} =registerSchema.validate(req.body);

        if(error){
            return next(error)
        }
//check if user alredy in database
         try{ 
            const exist =  await User.exists({email : req.body.email});

            if(exist){
                return next(CustomErrorHandler.alreadyExists('this email is alredy taken'))
            }
        }
         catch(err){
            return next(err)
    
       }


       //hash password
       const hashedPassword = await bcrypt.hash(req.body.password ,10);

       //prepare the model
       const user  = new User({
        name : req.body.name,
        email : req.body.name,
        password : hashedPassword
       })

       let access_Token;
       try{
        const result = await user.save();

        //Token
        access_Token= jwtService.sign({_id:result._id ,role:result.role})
       }


        catch{
        return next(err);
        }
  

    
         res.json( { access_Token : access_Token })
        
    }
}


export default RegisterController;