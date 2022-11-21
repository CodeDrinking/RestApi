import Joi from "joi";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../Services/CustomErrorHandler";
import bcrypt from 'bcrypt';
import jwtService from "../../Services/jwtService";
import {REFRESH_TOKEN} from "../../config"


const RegisterController ={
    async register (req , res , next){





        const registerSchema = Joi.object({
            name :  Joi.string().min(3).max(30).required(),
            email :  Joi.string().email().required(),
            password :  Joi.string().required(),
            repeat_password :  Joi.ref('password')
        });

        const {error} = registerSchema.validate(req.body);

        if(error){
            return next(error)
        }
//check if user alredy in database
         try{ 
            const exist =  await User.exists({ email : req.body.email });

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
        email : req.body.email,
        password : hashedPassword
       })
       console.log(user);

       let access_Token;
       let refresh_Token;
       try{
        const result = await user.save();
        // console.log(result);

        //Token
        access_Token= jwtService.sign({_id:result._id ,role:result.role})
        refresh_Token = jwtService.sign({_id:result._id , role: result.role}, '1y' , REFRESH_TOKEN)

        await RefreshToken.create({
            token: refresh_Token
        })
       }


        catch (err){
        return next(err);
        }
  

    
         res.json( { access_Token : access_Token , refresh_Token })
        
    }
}




export default RegisterController;