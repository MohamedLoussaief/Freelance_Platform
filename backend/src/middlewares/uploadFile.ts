import multer from "multer";

const uploadFile = (folderName: string) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `./uploads/${folderName}`);
      },
      filename: (req, file, cb) => {
        // Generate a unique filename by appending a timestamp
        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}-${file.originalname}`;
        cb(null, uniqueFilename);
      },
    }),
  });
};

export default uploadFile;
