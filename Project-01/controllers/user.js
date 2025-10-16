const User = require('../models/user');



async function handleGetAllUsers(req, res) {
    const allDBUsers = await User.find({});

    return res.json(allDBUsers);
}


async function handleGetUserByID(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' })
    return res.json(user);
}

async function handleUpdateUserByID(req, res) {
    await User.findByIdAndUpdate(req.params.id, {job_title: "Flutter Developer"});
    return res.json({ status: "Success" });
}

async function handleDeleteUserByID(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
}

async function handleCreateNewUser(req, res) {
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

    return res.status(201).json({ msg: "Successfully created!", id: result._id});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUser,
}