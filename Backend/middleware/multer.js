// import multer from "multer";

// const storage = multer.diskStorage({
//     destination:"uploads/",
//     filename:function(req,file,callback){
//         callback(null, Date.now() + "-" + file.originalname);
//         // callback(null,file.originalname);
//     },
// })

// const upload = multer({storage})
// export default upload


//2

import multer from "multer";
import path from "path";

// ✅ Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // temporary folder
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ✅ Allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"));
  }
};

// ✅ Create multer upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;



//3
// import multer from "multer";
// import fs from "fs";

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "./uploads/profiles";
//     fs.mkdirSync(dir, { recursive: true }); // create folder if missing
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// export const upload = multer({ storage });