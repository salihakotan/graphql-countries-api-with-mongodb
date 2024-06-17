import mongoose, { Schema } from "mongoose";

const LanguageSchema = new Schema({
  code: String,
  name: String,
    countries:[{
        type:Schema.Types.ObjectId,
        ref:"Country"
    }]
});

export default mongoose.model("Language", LanguageSchema);
