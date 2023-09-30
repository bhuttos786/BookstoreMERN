// Import and load the dotenv package using 'import'
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

//Middleware for parsing request body
app.use(express.json());

//route to create and save a new book
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send(
                { message: 'Send all required fields: title, author, publishYear' }
            );
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//Route to get all books from the database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})



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

