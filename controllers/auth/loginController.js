import Joi from "joi";
import { User  ,RefreshToken} from "../../models";
import CustomErrorHandler from "../../Services/CustomErrorHandler";
import bcrypt from 'bcrypt';
import jwtService from "../../Services/jwtService";
import { REFRESH_TOKEN } from "../../config";






const loginController = {
    async login(req , res , next){

        const loginSchema = Joi.object({
            email :  Joi.string().email().required(),
            password :  Joi.string().required()
        });
        const {error} = loginSchema.validate(req.body);

        if(error){
            return next(error);
        }
        
        try{
            const user= await User.findOne({email:req.body.email});
            if(!user){
                return next (CustomErrorHandler.wrongCred())
            }
            console.log(user , req.body.password);
            const match = await bcrypt.compare(req.body.password , user.password);

            if(!match){
                return next(CustomErrorHandler.wrongCred())
            }
            //token
           const access_Token= jwtService.sign({_id:user._id ,role:user.role})
           const refresh_Token = jwtService.sign({_id:user._id , role: user.role}, '1y' , REFRESH_TOKEN)

        await RefreshToken.create({
            token: refresh_Token
        })
           res.json({access_Token , refresh_Token})

        }
        catch(err){
            return next(err)
        }   
    }

    
}

export default loginController;