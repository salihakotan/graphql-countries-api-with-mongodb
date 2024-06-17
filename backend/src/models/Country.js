import mongoose, { Schema } from "mongoose";

const CountrySchema = new Schema({
    code:String,
title:String
})

export default mongoose.model("Country",CountrySchema)