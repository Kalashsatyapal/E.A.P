const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); // store in memory
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('spreadsheetml')) cb(null, true);
  else cb(new Error('Only Excel files allowed'), false);
};

module.exports = multer({ storage, fileFilter });
