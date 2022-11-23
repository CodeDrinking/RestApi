import { User } from "../models"
import CustomErrorHandler from "../Services/CustomErrorHandler";

const admin  = async(req , res , next) =>{
    try {
        // our auth.js is giving us req.user._id
        const user = await User.findOne({_id :req.user._id});
        console.log(user);
        if(user.role=="admin"){
            next();
        }else{
            return next (CustomErrorHandler.unAuthorized());
        }

    }
    catch (err){
        return next(CustomErrorHandler.serverError())
    }
}
export default admin;