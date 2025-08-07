const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAdminData } = require('../controllers/adminController');
const { getAllUsers, updateUserRole } = require('../controllers/adminController');

router.get('/users', auth, getAllUsers);
router.put('/update-role', auth, updateUserRole);

router.get('/dashboard', auth, getAdminData);

module.exports = router;
