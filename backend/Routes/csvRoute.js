const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { importFile } = require("../Controller/csvController");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("").post(upload.single("csvFile"), importFile);

module.exports = router;
