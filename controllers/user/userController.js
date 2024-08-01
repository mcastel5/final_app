const User  = require('./User');

async function createUser(user_data) {
  try {
  
    const newUser = await User.create(user_data);
    console.log(newUser)
    console.log('User created successfully!');
    return newUser;
  } catch (error) {
    console.error(error);
    return 'Error creating user.';
  }
}

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    return user ? user : 'User not found.';
  } catch (error) {
    console.error(error);
    return 'Error getting user.';
  }
}

async function updateUser(user_id, updated_data) {
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return 'User not found.';
    }
    await user.update(updated_data);
    return 'User updated successfully.';
  } catch (error) {
    console.error(error);
    return 'Error updating user.';
  }
}

async function deleteUser(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return 'User not found.';
    }
    await user.destroy();
    return 'User deleted successfully.';
  } catch (error) {
    console.error(error);
    return 'Error deleting user.';
  }
}

module.exports = { createUser, getUserByEmail, updateUser, deleteUser };
