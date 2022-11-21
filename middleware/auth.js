import CustomErrorHandler from "../Services/CustomErrorHandler";
import jwtService from "../Services/jwtService";

const auth = async (req, res , next) =>{
    let authHeader = req.headers.authorization
    console.log(authHeader);

    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized());

    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    
    try{
        const {_id , role} = await jwtService.verify(token)
        req.user= {};
        req.user._id= _id;
        req.user.role =role;

        next();
    }
    catch(err){

    }
}

export default auth;