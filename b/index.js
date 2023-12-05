import express from 'express';
import connectToDataBase from './Database.js';
import cors from "cors";
import multer from 'multer';
import authRoute from './router/authRoutes.js';
import courseRoute from './router/courseRoutes.js';
import userRoute from './router/userRoutes.js';
import paymentRoute from './router/paymentRoutes.js'
// import  bodyParser from "body-parser";
import {
  docModel,
  infoModel,
  educationModel,
  userModel,
} from "./models/userModel.js";
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;  
// app.use(bodyParser())

app.use(cors());
app.use(express.json({limit: '2mb'}));
app.use(express.static("upload"));
app.use("/auth", authRoute);

app.use("/course", multer().array() , courseRoute);
app.use("/user", multer().any() , userRoute);
app.use("/payment", paymentRoute);


connectToDataBase
  .then(async () => {
    app.listen(PORT, async () => {
      console.log(`app is running on http://localhost:${PORT}`); 
      // const userData = await infoModel.find( { user_id: ('65096a26ba94894b4109d8d9') } );
      // 65096ac2ba94894b4109d8e5
      // const userData = await infoModel.findOne({user_id: '65096a26ba94894b4109d8d9'});
      // console.log({userData});
    }); 
  })
  .catch((err) => {
    console.log("no conncection", err);
  });
