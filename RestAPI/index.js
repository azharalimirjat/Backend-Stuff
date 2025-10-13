const express = require('express');
const users = require('./MOCK_DATA.json')
const fs = require('fs');

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false}));

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
    return res.json(users)
});


app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

// POST
app.post('/api/users', (req, res) => {
    // TODO: Create the new user
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile('./DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status : "Pending"});
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