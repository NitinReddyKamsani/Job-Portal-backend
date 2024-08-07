// const express = require('express')
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import 'express-async-errors'
//import db's
import connectDB from "./config/db.js";
import { testPostController } from "./controllers/testController.js";
//import routes
import jobsRoutes from './routes/jobsRoute.js'
import userRoute from './routes/userRoute.js'
import testRoute from './routes/testRoute.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddlewear from "./middlewares/errorMiddleware.js";


//config Dot env
dotenv.config()

//Mongodb connection
connectDB();
//rest object
const app = express() //rest object

//middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

//routing
app.use('/api/v1/test', testRoute);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/job', jobsRoutes)
//validation errormiddlewear
app.use(errorMiddlewear)
//port 
const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
    console.log(`Server is runnimg in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan.white)
})