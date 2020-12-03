import express from "express";
import {BlogsController} from "../controllers/blogsController";
import {baseValidator} from "../middleware/validation-middleware";

const router = express.Router();

/**
 * @swagger
 * /comments/{id}:
 *   post:
 *     tags:
 *       - Blogs
 *     name: comment
 *     summary: adding a comment on the blog
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                Name:
 *                 type: string
 *                Email:
 *                 type:string
 *                comment:
 *                 type: string
 *             required:
 *                 -Name
 *                 -Email
 *                 -comment
 *               
 *     responses:
 *       201:
 *             description: Comment successfully added.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: server error.
 * */

router.post(
    "/:id", 
    baseValidator.commentvalidation, 
    BlogsController.addComment
    );

/**
 * @swagger
 * /comments:
 *   get:
 *     tags:
 *       - Comments
 *     name: comment
 *     summary: fetching all comments
 *     consumes:
 *       - application/json
 *     responses:
 *        200:
 *             description: Comments successfully fetched
 * */

router.get("/", BlogsController.fetchAllcomments);
export default router;