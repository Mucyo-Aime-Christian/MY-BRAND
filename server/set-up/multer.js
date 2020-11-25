const multer = require("multer");
// var upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
 // destination: (req, file, cb) => cb(null, "./uploads/"),
  //filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ 
    storage: storage ,
    limits : {fileSize : 1000000},
    fileFilter: fileFilter
});
const path = require('path');
function fileFilter (req, file, cb) {    
   const filetypes = /jpeg|jpg|png|gif/;
  const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
 const mimetype = filetypes.test(file.mimetype);

 if(mimetype && extname){
     return cb(null,true);
 } else {
     cb('Error: Images Only!',null);
 }
}
module.exports = upload;