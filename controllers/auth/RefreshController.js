import { RefreshToken, User} from "../../models"
import Joi from "joi";
import CustomErrorHandler from "../../Services/CustomErrorHandler";
import jwtService from "../../Services/jwtService";
import { REFRESH_TOKEN } from "../../config";

const RefreshController ={
    async refresh(req , res , next){
        //validation
        const refreshSchema = Joi.object({
            refresh_token :  Joi.string().required(),
        });
        const {error} = refreshSchema.validate(req.body);

        if(error){
            return next(error);
        }

        //database
        let refreshtoken;
        try{
            refreshtoken= await  RefreshToken.findOne({token :req.body.refresh_token})
            if(!refreshtoken){
                return next(CustomErrorHandler.unAuthorized("invalid refresh Token 44"))
            }
            console.log(refreshtoken);
            let userId;
            try{
                const {_id} = await jwtService.verify(refreshtoken.token , REFRESH_TOKEN);
                userId =_id;
            }
            
            catch(err){
                return next(CustomErrorHandler.unAuthorized("invalid refresh Token 33"))
                
            }
            const user = User.findOne({_id :userId});
            if(!user){
                return next(CustomErrorHandler.unAuthorized("No user find "))
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
            return next(new Error ('something went wrong' + err.message));


        }
        
    }
}

export default RefreshController;