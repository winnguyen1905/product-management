module.exports = (multer) => {
    const storage = multer.diskStorage({
        destination: './public/uploads', // ./ la di ra thu muc chinh, dest la tinh tu thu muc cap cao nhat
        filename: (req, file, cb) => {
          const uniqueName = Date.now()
          cb(null, `${uniqueName}-${file.originalname}`);
        }
      });
    return storage;
}