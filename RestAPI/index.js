const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

// Connecting to Mongoose
mongoose.connect('mongodb://localhost:27017/youtube-app')
    .then(() => console.log('MongoDB Connected.'))
    .catch((err) => console.log('MongoDB Error', err));

app.use(express.urlencoded({ extended: false }));


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
}, {timestamps: true});

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
app.get('/users', async (req, res) => {
    const allDBUsers = await User.find({});
    const html =
        `<ul>
            ${allDBUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
        </ul>`;
    return res.send(html)
});

// REST API points

// GET
app.get('/api/users', async (req, res) => {
    const allDBUsers = await User.find({});

    res.setHeader("X-myName", "Azhar Ali");
    return res.json(allDBUsers);
});


app.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' })
    return res.json(user);
});

// POST
app.post('/api/users', async (req, res) => {
    // TODO: Create the new user
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: 'All fields are required...' })
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.email,
        job_title: body.job_title,
    });

    return res.status(201).json({ msg: "Successfully created!" });
});


// PATCH: 
app.patch('/api/users/:id', async (req, res) => {
    // TODO: Edit the user with id=x
    await User.findByIdAndUpdate(req.params.id, {job_title: "Flutter Developer"});
    return res.json({ status: "Success" });
});

// DELETE:
app.delete('/api/users/:id', async (req, res) => {
    // TODO: Delete the user with id=x
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
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