const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/authMiddleware');
const { uploadExcel } = require('../controllers/excelController');

router.post('/upload', auth, upload.single('file'), uploadExcel);

module.exports = router;
