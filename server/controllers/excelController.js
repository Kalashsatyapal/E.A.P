const ExcelJS = require('exceljs');
const ExcelData = require('../models/Exceldata');

exports.uploadExcel = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.worksheets[0];

    const headers = worksheet.getRow(1).values.slice(1);
    const data = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const rowData = {};
      row.eachCell((cell, colNumber) => {
        rowData[headers[colNumber - 1]] = cell.value;
      });
      data.push(rowData);
    });

    await ExcelData.create({
      data,
      uploadedBy: req.user.id,
      originalName: req.file.originalname
    });

    res.status(200).json({ msg: 'Excel data uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Excel upload failed' });
  }
};
exports.getMyUploads = async (req, res) => {
  try {
    const files = await ExcelData.find({ uploadedBy: req.user.id }).sort({ uploadedAt: -1 });
    res.json(files);
  } catch {
    res.status(500).json({ msg: 'Failed to fetch uploads' });
  }
};

exports.deleteUpload = async (req, res) => {
  try {
    await ExcelData.deleteOne({ _id: req.params.id, uploadedBy: req.user.id });
    res.json({ msg: 'Deleted successfully' });
  } catch {
    res.status(500).json({ msg: 'Failed to delete file' });
  }
};