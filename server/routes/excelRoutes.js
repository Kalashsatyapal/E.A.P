const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const {
  uploadExcel,
  getMyUploads,
  deleteUpload,
} = require("../controllers/excelController");

router.post("/upload", auth, upload.single("file"), uploadExcel);
router.get("/my-uploads", auth, getMyUploads);
router.delete("/:id", auth, deleteUpload);
module.exports = router;
