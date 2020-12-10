import express from "express";
import {BlogsController} from "../controllers/blogsController";
import {upload} from "../set-up/multer";
import {baseValidator} from "../middleware/validation-middleware";
import {loggeduserandadmin} from "../middleware/admin";
const router = express.Router();

/**
 * @swagger
 * /blogs:
 *   get:
 *     tags:
 *       - Blogs
 *     name: Blog
 *     summary: fetch all blogs
 *     consumes:
 *        - application/json
 *     responses:
 *       200:
 *             description: Blogs successfully fetched.
 * */

router.get(
    "/", 
    BlogsController.fetchAllBlogs
    );

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     tags:
 *       - Blogs
 *     name: Blog
 *     summary: Retrieve single blog 
 *     consumes:
 *        - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *             description: Blog successfully fetched.
 *       404:
 *             description: Blog not found.
 *       500:
 *             description: server error.
 * */

router.get(
    "/:id", 
    BlogsController.fetchSingleBlog
    );

/**
 * @swagger
 * /blogs:
 *   post:
 *     tags:
 *       - Blogs
 *     name: Blog
 *     summary: post a  blog
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *       - in: formData
 *         name: title
 *         type: string
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *       - in: formData
 *         name: blogImage
 *         type: file
 *         required: true
 *     responses:
 *       201:
 *             description: Blog successfully Created.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unAuthorized
 * */

router.post(
    "/", 
    loggeduserandadmin.checkAdmin, 
    upload.single("blogImage"), 
    baseValidator.blogvalidation, 
    BlogsController.createBlogs
    );

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     tags:
 *       - Blogs
 *     name: blog
 *     summary: Update a blog
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *       - in: formData
 *         name: title
 *         type: string
 *         required: false
 *       - in: formData
 *         name: description
 *         type: string
 *         required: false
 *       - in: formData
 *         name: blogImage
 *         type: file
 *         required: false
 *     responses:
 *       200:
 *             description: Blog successfully updated.
 *       400:
 *             description: Bad request.
 *       404:
 *             description: Blog not found.
 *       500:
 *             description: server error.
 *       401:
 *             description: unauthorized
 * */


router.put(
    "/:id", 
    loggeduserandadmin.checkAdmin, 
    baseValidator.updateblogValidate, 
    upload.single("blogImage"),
    BlogsController.updateBlog
    );

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     tags:
 *       - Blogs
 *     name: blog
 *     summary: Delete a blog
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
 *             description: Blog successfully deleted.
 *       404:
 *             description: Blog not found.
 *       500:
 *             description: server error.
 *       401:
 *             description: unauthorized
 * */

router.delete(
    "/:id", 
    loggeduserandadmin.checkAdmin, 
    BlogsController.deleteBlog
    );

export default router; 