// Import and load the dotenv package using 'import'
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;




app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("App connected to the database");
        app.listen(port, () => {
            console.log(`App is listening to port: ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

