
import {z} from "zod";

import mongoose from "mongoose";


export const animalZod = z.object({
    name:z.string().min(1),
    description:z.string().min(1),
    imageUrl:z.string().url(),
    type:z.string(),
    category:z.string().optional(),
})


const animalSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:false
    }
    
},{timestamps:true});


export default mongoose.model("Animal",animalSchema);