const mongoose = require('mongoose');

const excelDataSchema = new mongoose.Schema({
  data: [{}], // array of objects
  originalName: String,
  uploadedBy: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ExcelData', excelDataSchema);
