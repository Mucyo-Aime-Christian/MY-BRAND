import { Router } from  "express";
import  {usercontroller} from '../controllers/usercontroller';
import {baseValidator} from "../middleware/validation-middleware";
import {upload} from "../set-up/multer";
import  {loggeduserandadmin} from "../middleware/admin";
const router = Router();

router.post(
    '/signUp',
    baseValidator.createuserDataValidate, 
    usercontroller.createAccount
    );

router.post(
    '/login',
    baseValidator.createuserDataValidate, 
    usercontroller.login
    );

router.get(
    '/Users', 
    loggeduserandadmin.checkAdmin, 
    usercontroller.getUsers
    );

router.put(
    "/updateProfile/:id", 
    loggeduserandadmin.checkAdmin, 
    upload.single("profileImage"), 
    usercontroller.updateProfilePicture
    );

router.delete(
    '/deleteUser/:id', 
    loggeduserandadmin.checkAdmin, 
    usercontroller.deleteUser
    );

export default router;
