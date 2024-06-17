import mongoose, { Schema } from "mongoose";

const LanguageSchema = new Schema({
    code:String,
title:String
})

export default mongoose.model("Language",LanguageSchema)