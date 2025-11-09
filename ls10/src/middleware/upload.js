import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WebP and GIF are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export const uploadPostImages = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

export { upload };

