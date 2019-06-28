console.log("Starting notes.js");

const fs = require('fs');

var fetchNotes = () => {
    try {
        var noteString = fs.readFileSync("Notes.json");
        return JSON.parse(noteString);
    }catch(e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync("Notes.json", JSON.stringify(notes));
};

var addNote = (title, body) => {

    var notes = fetchNotes();
    var note = {
        title : title,
        body : body
    };
    
    var duplicates = notes.filter(note => note.title === title);
    if(duplicates.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
    
};

var removeNote = (title) => {

    var notes = fetchNotes();
    var filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    
    return notes.length !== filteredNotes.length;

};

var getNote = (title) => {

    var notes = fetchNotes();
    var filteredNotes = notes.filter(note => note.title === title);
    return filteredNotes[0];

};

var listAll = () => {

    var notesAll = fetchNotes();
    return notesAll;

};

var logNote = (note) => {

    console.log("---");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);

};

module.exports = {addNote, removeNote, getNote, listAll, logNote};