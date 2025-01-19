import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from "./config/mongodb.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";



//app config
const app = express();
const port = process.env.PORT || 3000;




//middlewares
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//database connection
connectDB()

//API endpoints
app.use('/api/food',foodRouter) 
app.use('/images',express.static('uploads'))

app.use('/api/user',userRouter)

app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouter)

app.get("/", (req, res) => {
  res.send("Working");
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
