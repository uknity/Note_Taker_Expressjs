//require fs 
const fs = require("fs");
//requires uuid tool to assign random id
const { v4: uuidv4 } = require("uuid");


module.exports = (app) => {

    app.get('/api/notes', (req, res) => {
        //fs readfile db with its own file with err / data
        fs.readFile("db/db.json","utf8", (err, data) => res.json(JSON.parse(data)));
       
    });

    // post route
    // read all data from db.json file using JSON.parse)
    app.post('/api/notes', (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) =>{
    //converts data to Array
            const noteArr = JSON.parse(data);

            // reads new Note from req.body
            const newNote = req.body;

            // adds a unique id to the new Note
            newNote.id = uuidv4();

    // pushes the new note to the notes Array
            noteArr.push(newNote);
    // writes the notes Array to the db.json file using JSON.stringify)
            fs.writeFileSync("db/db.json", JSON.stringify(noteArr), "utf8");
        });
    })  

    //'DELETE /api/notes/:id'
       
    //In order to delete a note, you'll need to read all notes from the `db.json` file
    app.delete('/api/notes/:id', (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            //names json data array noteArr
            const noteArr = JSON.parse(data);
            //assigns idNum const to the id of the data
            const idNum = req.params.id;
            //filters the noteArr for the note with the idNum
            const filteredArray = noteArr.filter(note => note.id !== idNum);
            //writes the file back to the databasee
            fs.writeFileSync("db/db.json", JSON.stringify(filteredArray), "utf8");
            //sends response
            res.sendStatus(200);
        });
    });
}