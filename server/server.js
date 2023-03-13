// Load env variables 

if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}else{
    console.log("Error")
}



// Import dependencies 
const express = require("express");
const connectToDb = require('./config/connectToDb');
const noteController = require("./controllers/notControllers");


// Create an express app 
const app = express();

// Configure express app 
app.use(express.json());


// Connect to database 
connectToDb();

// Routing 


app.get('/notes', noteController.fetchNotes)
app.put('/notes/:id', noteController.fetchNote);
app.post('/notes', noteController.createNote)
app.get("/notes/:id",noteController.updateNote)
app.delete("/notes/:_id",noteController.deleteNote);

// Start our server 
app.listen(process.env.PORT);

console.log("Server is running")