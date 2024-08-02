const { createUser, getUserByEmail, updateUser, deleteUser } = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Retrieve a user by email
exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;
  
  try {
    const message = await updateUser(userId, updatedData);
    res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a user by email
exports.deleteUser = async (req, res) => {
  const { email } = req.params;
  
  try {
    const message = await deleteUser(email);
    res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
