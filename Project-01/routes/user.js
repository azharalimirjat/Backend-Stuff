const express = require('express');
const { 
    handleGetAllUsers, 
    handleGetUserByID, 
    handleUpdateUserByID, 
    handleDeleteUserByID, 
    handleCreateNewUser
    } = require('../controllers/user');

const router = express.Router();

// GET
router.get('/', handleGetAllUsers);

// GET: User by ID
router.get('/:id', handleGetUserByID);

// POST
router.post('/', handleCreateNewUser);

// PATCH: 
router.patch('/:id', handleUpdateUserByID);

// DELETE:
router.delete('/:id', handleDeleteUserByID);

module.exports = router;