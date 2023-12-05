import mongoose from "mongoose"; 
import { courseModel } from "./models/courseModel.js"; 
import 'dotenv/config'

// const uri = process.env.URI
const uri = "mongodb://0.0.0.0:27017";
const connectToDataBase = mongoose.connect(uri, { dbName: "STUDENT_PORTAL" })

export default connectToDataBase;
