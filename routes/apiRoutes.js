//const notes = require('../db/db.json');
//require fs 
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


module.exports = (app) => {

    app.get('/api/notes', (req, res) => {
        //fs readfile db with its own file with err / data
        fs.readFile("db/db.json","utf8", (err, data) => res.json(JSON.parse(data)));
       
    });

    app.post('/api/notes', (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) =>{
//convert data to Array
            const noteArr = JSON.parse(data);

            // read new Note from req.body
            const newNote = req.body;


            // add a unique id to the new Note
            newNote.id = uuidv4();

    // push the new note to the notes Array
            noteArr.push(newNote);
    // write the notes Array to the db.json file (remember to use JSON.stringify)
            fs.writeFileSync("db/db.json", JSON.stringify(noteArr), "utf8");
        });

        
    })
    // post route
    // read all data from db.json file (remember to use JSON.parse)
   
}