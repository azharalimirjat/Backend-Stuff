const express = require('express');

const router = express.Router();

// router.get('/users', async (req, res) => {
//     const allDBUsers = await User.find({});
//     const html =
//         `<ul>
//             ${allDBUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
//         </ul>`;
//     return res.send(html)
// });

// REST API points

// GET
router.get('/', async (req, res) => {
    const allDBUsers = await User.find({});

    res.setHeader("X-myName", "Azhar Ali");
    return res.json(allDBUsers);
});


router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' })
    return res.json(user);
});

// POST
router.post('/', async (req, res) => {
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
router.patch('/:id', async (req, res) => {
    // TODO: Edit the user with id=x
    await User.findByIdAndUpdate(req.params.id, {job_title: "Flutter Developer"});
    return res.json({ status: "Success" });
});

// DELETE:
router.delete('/:id', async (req, res) => {
    // TODO: Delete the user with id=x
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
});

module.exports = router;