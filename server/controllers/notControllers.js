const Note = require("../models/note")



const fetchNotes = async (req, res) => {
    // Find the notes 
    const notes = await Note.find();
    // Respond with them 
    res.json({ notes: notes });
}


const fetchNote = async (req, res) => {
    // Get id of the url 
    const noteId = req.params.id;
    // Find the note using that id 
    const note = await Note.findById(noteId)
    // Respond with the note 
    res.json({ note: note })
}


const createNote = async (req, res) => {
    // Get the sent in data of request body 
    const title = req.body.title;
    const body = req.body.body;

    // Create a note with it 
    const note = await Note.create({
        title: title,
        body: body,

    })
    // respond with the new note 
    res.json({ note: note });

}



const updateNote = async (req, res) => {
    // Get the id off the url 
    const noteId = req.params.id;
    // Get the data of the req body 
    const title = req.body.title;
    const body = req.body.body;


    // Find and update the record 
    await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body,
    });

    // Find updated note 
    const note = await Note.findById(noteId);
    // Respond with it 
    res.json({ note: note })

}




const deleteNote =  async (req, res) => {
    // Get id of url 
    const noteId = req.params.id;

    // Delete the Record 
     await Note.deleteOne({ id: noteId });

    // Respond 
    res.json({ success: "Record deleted" });
}




module.exports = {
    fetchNotes: fetchNotes,
    fetchNote: fetchNote,
    createNote: createNote,
    updateNote: updateNote,
    deleteNote: deleteNote,
}