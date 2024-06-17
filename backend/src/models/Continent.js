import mongoose, { Schema } from "mongoose";


const ContinentSchema = new Schema({
    code:String,
    title:String
})

export default mongoose.model("Continent",ContinentSchema)