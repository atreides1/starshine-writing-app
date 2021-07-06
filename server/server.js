const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

const port = process.env.PORT || 8080 || 3000;

// connect to database
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const projectSchema = mongoose.Schema({
    user: String,
    stories: String,
    currentSectionUUID: String,
});

let SavedProject = mongoose.model("Project", projectSchema);

// create
app.post('/projects', (req, res) => {
    console.log(req.body);
    const project = {
        user: req.body.user,
        stories: req.body.stories,
        currentSectionUUID: req.body.currentSectionUUID,
    };
    let newProject = new SavedProject(project);
    newProject.save(async (err) => {
        if (err) {
            console.log(err);
        } else {
            await SavedProject.find({}, (err, data) => {console.log("database: ", data)});
        }
    })
});

// read all
app.get('/projects', (req, res) => {
    SavedProject.find({}, (err, data) => { 
        console.log("database: ", data); 
    });
});

// read specific project
app.get('/projects/:user', (req, res) => {
    SavedProject.find({user: req.params.user}, (err, data) => {
        if (err) {
            res.write(false);
        } else {
            res.json(data);
        }
    })
});

// update 
app.put('/projects/:user', async (req, res) => {
    const project = {
        user: req.params.user,
        stories: req.body.stories,
        currentSectionUUID: req.body.currentSectionUUID,
    };
    await SavedProject.findOneAndUpdate({ user: req.params.user }, project);
});

// delete user
app.delete('/projects/:user', async(req, res) => {
    SavedProject.deleteOne({ user: req.params.user }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            SavedProject.find({}, function (err, data) { console.log("database after deleting: " + data) });
        }
    })
});

app.listen(port, () => console.log("Listening on port " + port));