 import { string } from "joi";
import mongoose, { model, Schema }  from "mongoose";


 const UserSchema  = new Schema({
    name : {
        type  : String,
        require: true,
    },
    email : {
        type  : String,
        require: true,
        unique : true
    },
    password : {
        type  : String,
        require: true
    },
    role : {
        type  : String,
        require: true,
        default : 'customer'
    }
 }, {
    timestamps: true
 });

 export default  mongoose.model('User' ,UserSchema);
 