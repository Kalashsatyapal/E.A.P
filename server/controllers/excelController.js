const ExcelJS = require('exceljs');
const ExcelData = require('../models/Exceldata');

exports.uploadExcel = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.worksheets[0];

    const headers = worksheet.getRow(1).values.slice(1); // Remove empty first
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
      uploadedBy: req.user.id
    });

    res.status(200).json({ msg: 'Excel data uploaded and stored!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Excel upload failed' });
  }
};
