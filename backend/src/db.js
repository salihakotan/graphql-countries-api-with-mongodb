import mongoose from 'mongoose';

import dotenv from "dotenv"

dotenv.config()

export default ()=> {
    
    
    mongoose.connect(process.env.MONGO_URI, {
        dbName:"countriesApi"
    })

    
    mongoose.connection.on('open', console.info.bind(console, 'MongoDB: Connected'));
    mongoose.connection.on('err', console.error.bind(console, 'MongoDB: Connection error'));
}