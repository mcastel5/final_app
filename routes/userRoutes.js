const express = require('express');
const router = express.Router();

const {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Route to create a new user
router.post('/users', createUser);

// Route to retrieve a user by email
router.get('/users/:email', getUserByEmail);

// Route to update user details
router.put('/users/:userId', updateUser);

// Route to delete a user by email
router.delete('/users/:email', deleteUser);

module.exports = router;
