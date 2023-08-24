const express = require('express');
const fs = require('fs');
const app = express();
const uuid = require('uuid');
const path = require('path');
const PORT= process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(notes);
});

app.post('/api/notes', (req, res) =>{
    const {title, note} = req.body;

    if (title && note){
        const newNote = {
            title,
            note,
            id: uuid(),
          };
      
    }
})
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
