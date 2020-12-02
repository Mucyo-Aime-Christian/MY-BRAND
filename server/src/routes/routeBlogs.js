import express from "express";
import {BlogsController} from "../controllers/blogsController";
import {upload} from "../set-up/multer";
import {baseValidator} from "../middleware/validation-middleware";
import {loggeduserandadmin} from "../middleware/admin";
const router = express.Router();


router.get(
    "/", 
    BlogsController.fetchAllBlogs
    );

router.get(
    "/:id", 
    BlogsController.fetchSingleBlog
    );

router.post(
    "/", 
    loggeduserandadmin.checkAdmin, 
    upload.single("blogImage"), 
    baseValidator.blogvalidation, 
    BlogsController.createBlogs
    );

router.put(
    "/:id", 
    loggeduserandadmin.checkAdmin, 
    upload.single("blogImage"),
    baseValidator.blogvalidation, 
    BlogsController.updateBlog
    );

router.delete(
    "/:id", 
    loggeduserandadmin.checkAdmin, 
    BlogsController.deleteBlog
    );

export default router; 