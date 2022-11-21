
import mongoose, { model, Schema }  from "mongoose";


const RefreshTokenSchema  = new Schema({
   token : {
       type  : String,
       unique : true,
       require: true
   }
  
}, {
   timestamps: false
});

export default  mongoose.model('RefreshToken' ,RefreshTokenSchema);
