console.log('Staring app.js');

const fs = require('fs');
const yargs = require("yargs");

const note = require("./notes.js");

var titleOptions = {
    describe : "Title of note",
    demand : true,
    alias : "t"
};
var bodyOptions = {
    describe : "Body of note",
    demand : true,
    alias : "b"
};

var argv=yargs
        .command("add", "Add a new note", {
            title : titleOptions,
            body : bodyOptions
        })
        .command("list", "Listing all notes")
        .command("read", "Read a note", {
            title : titleOptions
        })
        .command("remove", "Removing a note", {
            title : titleOptions
        })
        .help()
        .argv;

var command = argv._[0];
console.log("Command:", command);

if(command === "add") {
    
    var noteAdd = note.addNote(argv.title, argv.body);
    if(noteAdd) {
        console.log("Note created");
        note.logNote(noteAdd);
    }else {
        console.log("Note already present");
    }

}else if(command === "list") {
    
    var allNotes = note.listAll();
    allNotes.forEach(Note => {
        note.logNote(Note);
    });

}else if(command==="read") {
    
    var obtain = note.getNote(argv.title);
    if(obtain) {
        console.log("Note found");
        note.logNote(obtain);
    }else {
        console.log("Note not found");
    }

}else if(command === "remove") {
    
    var removed = note.removeNote(argv.title);
    if(removed){
        console.log("Note removed");
    }else{
        console.log("Note not found");
    }

}else {
    console.log("Command not recognised");
}