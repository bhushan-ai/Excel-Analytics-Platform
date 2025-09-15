import Upload from "../Models/upload.model.js";
import upload from "../../Config/multer.js";
import xlsx from "xlsx";
import fs from "fs";
import ParsedData from "../Models/parseData.model.js";

export const fileUpload = async (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, msg: "No file uploaded" });
    }

    try {
      const newUpload = await Upload.create({
        user: req.user._id,
        filename: req.file.filename,
        filepath: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });

      if (!newUpload) {
        return res
          .status(400)
          .json({ success: false, msg: "No file uploaded" });
      }

      const workBook = xlsx.readFile(req.file.path);
      const sheetName = workBook.SheetNames[0];
      const sheet = workBook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet);

      //savind to parsedData
      const savedData = await ParsedData.create({
        upload: newUpload._id,
        user: req.user._id,
        sheetName: sheetName,
        data: jsonData,
      });

      return res.status(200).json({
        success: true,
        msg: "File uploaded successfully ",
        data: jsonData,
        parsed: savedData,
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  });
};

//delete file
export const deleteFile = async (req, res) => {
  const fileId = req.params.id;

  if (!fileId) {
    return res.status(400).json({ success: false, msg: "fileid not found" });
  }
  try {
    const file = await Upload.findById(fileId);

    if (fs.existsSync(file.filepath)) {
      fs.unlinkSync(file.filepath);
    }
    await file.deleteOne();

    return res.status(200).json({
      success: true,
      deletedFile: file,
      msg: "file deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

//get file

export const getFile = async (req, res) => {
  const { fileId } = req.params;
  if (!fileId) {
    return res.status(400).json({ success: false, msg: "file id not found" });
  }
  try {
    const fileData = await ParsedData.findById(fileId).select("data");
    const file = await Upload.findById(fileId).select("filename size user");
    if (!file) {
      return res.status(400).json({ success: false, msg: "file not found" });
    }
    return res.status(200).json({
      success: true,
      file: file,
      fileData: fileData,
      msg: "file and fileData fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
