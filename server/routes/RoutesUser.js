const { Router } = require ('express');
const  { createAccount, login, getUsers, deleteUser, updateProfilePicture } =require ('../controllers/usercontroller');
const base_Validator = require("../middleware/validation-middleware");
const upload = require("../set-up/multer");
const  {checkAdmin} = require("../middleware/admin");
const router = Router();

router.post('/signUp',base_Validator.createuserDataValidate, createAccount);

router.post('/login',base_Validator.createuserDataValidate, login);

router.get('/getUsers', checkAdmin, getUsers);

router.put("/updateProfile/:id", checkAdmin, upload.single("profileImage"), updateProfilePicture);

router.delete('/deleteUser/:id', checkAdmin, deleteUser);

module.exports= router;
