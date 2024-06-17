import mongoose, { Schema } from "mongoose";

const CountrySchema = new Schema({
  code: String,
  name: String,
  continent_code:String,
  languages:[{
    type:Schema.Types.ObjectId,
    ref:"Language"
  }],
  continent:{
    type:Schema.Types.ObjectId,
    ref:"Continent"
  }
});

export default mongoose.model("Country", CountrySchema);
