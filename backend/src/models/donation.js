import mongoose from "mongoose";
import {z} from "zod";




export const donationZod = z.object({
    donorName:z.string().min(1),
    donorEmail:z.string().email(),
    amount:z.number().positive(),
    animal: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val),{message: "Invalid animal ID",}),
    paymentId:z.string().min(1)

});



const donationSchema = new mongoose.Schema({

    donorName:{
        type:String,
        required:true,
    },
    donorEmail:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    animal:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Animal",
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Donation",donationSchema);