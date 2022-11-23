import {APP_URL} from "../config"
import mongoose, {  Schema }  from "mongoose";


const ProductSchema  = new Schema({
   name : {
       type  : String,
       require: true,
   },
   price : {
       type  : String,
       require: true,
       unique : true
   },
   size : {
       type  : String,
       require: true
   },
   image : {
       type  : String,
       require: true ,  get: (image) =>{
        return `${APP_URL}/${image}`
       }},
}, {
   timestamps: true, toJSON :{getters : true} ,id:false
});

export default  mongoose.model('Product' ,ProductSchema);
