import { Router } from  "express";
import  {usercontroller} from '../controllers/usercontroller';
import {baseValidator} from "../middleware/validation-middleware";
import {upload} from "../set-up/multer";
import  {loggeduserandadmin} from "../middleware/admin";
const router = Router();

/**
 * @swagger
 * /users/signUp:
 *   post:
 *     tags:
 *       - Users
 *     name: SignUp
 *     summary: Creates a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *         required:
 *                -email
 *                -password
 *     responses:
 *       201:
 *             description: user created successfully.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: The email is already in use by another account.
 * */

router.post(
    '/signUp',
    baseValidator.createuserDataValidate, 
    usercontroller.createAccount
    );

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Login a registered user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *         required:
 *                -email
 *                -password
 *     responses:
 *       200:
 *             description: user logged in successfully.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: Invalid email or Password.
 * */

router.post(
    '/login',
    baseValidator.createuserDataValidate, 
    usercontroller.login
    );

/**
 * @swagger
 * /users/Users:
 *   get:
 *     tags:
 *       - Users
 *     name: User
 *     summary: fetch all Users
 *     consumes:
 *        - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *             description: Users successfully fetched.
 *       401:
 *             description: unauthorized
 * */

router.get(
    '/Users', 
    loggeduserandadmin.checkAdmin, 
    usercontroller.getUsers
    );

/**
 * @swagger
 * /users/updateProfile/{id}:
 *   put:
 *     tags:
 *       - Users
 *     name: User
 *     summary: Update a user's profile picture
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *       - in: formData
 *         name: profileImage
 *         type: file
 *         required: true
 *     responses:
 *       201:
 *             description: profile image successfully updated.
 *       400:
 *             description: Bad request.
 *       403:
 *             description: Access denied.
 *       500:
 *             description: server error.
 * */

router.put(
    "/updateProfile/:id", 
    loggeduserandadmin.checkAdmin, 
    upload.single("profileImage"), 
    usercontroller.updateProfilePicture
    );

/**
 * @swagger
 * /users/deleteUser/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     name: User
 *     summary: delete registered user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: User successfully deleted.
 *       404:
 *             description: User not found.
 *       500:
 *             description: server error.
 *       401:
 *             description: unauthorized
 * */

router.delete(
    '/deleteUser/:id', 
    loggeduserandadmin.checkAdmin, 
    usercontroller.deleteUser
    );

export default router;
