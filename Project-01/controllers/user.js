const User = require('../models/user');


// Get all the users data:
async function handleGetAllUsers(req, res) {
    const allDBUsers = await User.find({});

    return res.json(allDBUsers);
}

// Getting the user by its ID:
async function handleGetUserByID(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found!' })
    return res.json(user);
}

// Updating the user's data by it's ID:
async function handleUpdateUserByID(req, res) {
    await User.findByIdAndUpdate(req.params.id, {job_title: "Flutter Developer"});
    return res.json({ status: "Successfully updated!" });
}

// Deleting the user by the ID:
async function handleDeleteUserByID(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Successfully deleted" });
}

// Creating a new user:
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

    return res.status(201).json({ msg: "Successfully Added!", id: result._id});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUser,
}