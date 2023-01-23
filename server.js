const express = require('express');
const utilities = require('./helpers/fsUtils');
const path = require('path');
const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
app.get('/', (req, res) => {
    console.info(`${req.method} request received at the home page.`);
    res.sendFile(path.join(__dirname, '/public/index.html'));
  }
);

// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
app.get('/notes', (req, res) => {
    console.info(`${req.method} request received to get the note page`);
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for the actual API notes`);
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
app.post('/api/notes',(req,res) => {
    console.info(`${req.method} request received to post on the note page`);
    if(req.body.title && req.body.text) {
        utilities.readAndAppend(req.body, './db/db.json');
        const response = {
            status: 'success',
            body: req.body,
        };
        console.log(response);
        res.status(201).json(response);
    }
    else {
        res.status(500).json('error in posting')
    };
})

//this is optional
app.delete(`/api/notes/:id`, (req,res) => {
    console.info(`${req.method} request received to delete on the note page`);
    //we would have to review the notes and figure out which one the user wants to delete.
    //based on the deleteNote function in index.html, it looks like we assign an id to each note.
})

// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
