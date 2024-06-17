import mongoose, { Schema } from "mongoose";


const ContinentSchema = new Schema({
    code:String,
    name:String,
    
    countries:[{
        type:Schema.Types.ObjectId,
        ref:"Country"
    }],
})

export default mongoose.model("Continent",ContinentSchema)