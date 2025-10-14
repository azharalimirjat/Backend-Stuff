const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const mongoose = require('mongoose');
const { type } = require('os');
const strict = require('assert/strict');

const app = express();
const PORT = 8000;

// Connecting to Mongoose
mongoose.connect('mongodb://localhost:27017/youtube-app')
.then(() => console.log('MongoDB Connected.'))
.catch((err) => console.log('MongoDB Error', err));

app.use(express.urlencoded({ extended: false}));


//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    job_title: {
        type: String,
    },
    gender: {
        type: String,
    },
});

// Model
const User = mongoose.model('user', userSchema);


app.use((req, res, next) => {
    console.log("Hello for middleware 01");
    req.myUserName = "Azhar Ali";

    fs.appendFile(
        'log.txt', 
        `${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`, 
        (err, data) => {
            next();
        }
    );
});

app.use((req, res, next) => {
    console.log("Hello for middleware 02", req.myUserName);
    next();
});

// ROUTES
app.get('/users', (req, res) => {
    const html =
        `<ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
        </ul>`;
    return res.send(html)
});

// REST API points

// GET
app.get('/api/users', (req, res) => {
    res.setHeader("myName", "Azhar Ali");
    return res.json(users);
});


app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json({error: 'User not found.'})
    return res.json(user);
});

// POST
app.post('/api/users', (req, res) => {
    // TODO: Create the new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title)
    {
        res.status(400).json({msg: 'All fields are required...'})
    }
    users.push({...body, id: users.length+1});
    fs.writeFile('./DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status : "Pending"});
    })
});


// PATCH: 
app.patch('/api/users/:id', (req, res) => {
    // TODO: Edit the user with id=x
    return res.json({ status: "Panding" });
});

// DELETE:
app.delete('/api/users/:id', (req, res) => {
    // TODO: Delete the user with id=x
    return res.json({ status: "Panding" });
});


// Merging with requests which are working on id:
// app.route('/api/users/:id'
//     .get((req, res) => {
//         const id = Number(req.params.id);
//         const user = users.find((user) => user.id === id);
//         return res.json(user);
//     }))
//     .put((req, res) => {
//         // TODO: Edit the user with id=x
//         return res.json({ status: "Panding" })

//     })
//     .delete((req, res) => {
//         // TODO: Delete the user with id=x
//         return res.json({ status: "Panding" });
//     });

app.listen(PORT, () => {
    console.log("Server Started!");
});