const User = require('../models/User');

// Create a new user
async function createUser(userData) {
  try {
    const newUser = await User.create(userData);
    console.log('User created successfully!');
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user.');
  }
}

// Retrieve a user by email
async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Error getting user.');
  }
}

// Update user details
async function updateUser(userId, updatedData) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    await user.update(updatedData);
    return 'User updated successfully.';
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error updating user.');
  }
}

// Delete a user by email
async function deleteUser(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found.');
    }
    await user.destroy();
    return 'User deleted successfully.';
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user.');
  }
}

module.exports = { createUser, getUserByEmail, updateUser, deleteUser };
