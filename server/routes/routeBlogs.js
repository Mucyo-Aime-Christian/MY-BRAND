const express = require("express");
const BlogCtler = require("../controllers/blogsController");
const upload = require("../set-up/multer");
const base_Validator = require("../middleware/validation-middleware");
const router = express.Router();
const {checkAdmin} = require("../middleware/admin");

router.get("/", BlogCtler.fetchAllBlogs);
router.get("/:id", BlogCtler.fetchSingleBlog);
router.post("/", checkAdmin, upload.single("blogImage"), base_Validator.blogvalidation, BlogCtler.createBlogs);
router.put("/:id", checkAdmin, upload.single("blogImage"),base_Validator.blogvalidation, BlogCtler.updateBlog);
router.delete("/:id", checkAdmin, BlogCtler.deleteBlog);

module.exports = router; 