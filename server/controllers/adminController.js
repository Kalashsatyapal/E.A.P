exports.getAdminData = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Unauthorized' });
  }
  res.json({ msg: 'Welcome, admin dashboard!' });
};

const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Unauthorized' });
  const users = await User.find({}, '-password'); // exclude password
  res.json(users);
};

// Update user role
exports.updateUserRole = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Unauthorized' });
  const { userId, newRole } = req.body;

  if (!['user', 'admin'].includes(newRole)) {
    return res.status(400).json({ msg: 'Invalid role' });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: 'User not found' });

  user.role = newRole;
  await user.save();

  res.json({ msg: `User role updated to ${newRole}` });
};
