const express = require('express');
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


//this is optional
app.delete(`/api/notes/`)
/*
reference code from index.js:

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
*/


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
