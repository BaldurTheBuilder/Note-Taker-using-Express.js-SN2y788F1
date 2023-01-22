const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const app = express();

app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request received to get notes`);
    console.info(`${req.method} request received to get notes`);
});

app.post('/api/notes',(req, res) => {
    console.info(`${req.method} request received to add a note`);
    const {noteTitle, noteBody} = req.body;

    if(noteTitle && noteBody) {
        const newNote = {
            title,
            body
        };

        const noteString = JSON.stringify(newNote);

        fs.appendFile(`./db/db.json`, `\n${noteString},`, (err) => 
            err
                ? console.error(err)
                : console.log(
                    `note for ${newNote.title} has been written to JSON file`
                )
        )

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('error in posting review');
    }
});

//this is optional
app.delete(`/api/notes/`)
/*
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
*/

// GIVEN a note-taking application

// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page

// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column

// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page

// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes

// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column

// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
