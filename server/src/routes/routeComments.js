import express from "express";
import {BlogsController} from "../controllers/blogsController";
import {baseValidator} from "../middleware/validation-middleware";

const router = express.Router();

router.post(
    "/:id", 
    baseValidator.commentvalidation, 
    BlogsController.addComment
    );

router.get("/", BlogsController.fetchAllcomments);
export default router;