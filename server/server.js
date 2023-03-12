// Load env variables 

if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}



// Import dependencies 
const express = require("express");
const connectToDb = require('./config/connectToDb');
const Note = require("./models/note");


// Create an express app 
const app = express();

// Configure express app 
app.use(express.json());


// Connect to database 
connectToDb();

// Routing 
app.get("/", (req, res)=>{
    res.json({Hello: "world"})
})

app.get('/notes', async (req, res)=>{
    // Find the notes 
    const notes = await Note.find();
    // Respond with them 
    res.json({notes:notes});
})


app.post('/notes', async (req, res)=>{
    // Get the sent in data of request body 
    const title = req.body.title;
    const body = req.body.body;

    // Create a note with it 
const note = await Note.create({
    title:title,
    body:body,

})
    // respond with the new note 
    res.json({note:note});

})

app.put('/notes/:id', async (req, res)=>{
    // Get the id off the url 
    const noteId = req.params.id;
    // Get the data of the req body 
    const title = req.body.title;
    const body = req.body.body;


    // Find and update the record 
   await Note.findByIdAndUpdate(noteId, {
        title: title,
        body:body,
    });

    // Find updated note 
    const note = await Note.findById(noteId);
    // Respond with it 
    res.json({note:note})

});




app.get("/notes/:id", async (req, res)=>{
    // Get id of the url 
    const noteId = req.params.id;
    // Find the note using that id 
    const note = await Note.findById(noteId)
    // Respond with the note 
    res.json({note:note})
})


app.delete("/notes/:id", async(req, res)=>{
    // get id of url 
    const noteId = req.params.id;
    // Delete the record 
    await Note.deleteOne({id: noteId});
    // Respond  
    res.json({success: "Record deleted"});
});

// Start our server 
app.listen(process.env.PORT);

console.log("Server is running")