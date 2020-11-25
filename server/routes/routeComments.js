const express = require("express");
const BlogCtlr = require("../controllers/blogsController");
const base_Validator = require("../middleware/validation-middleware");
const router = express.Router();

router.post("/:id", base_Validator.commentvalidation, BlogCtlr.addComment);
router.get("/", BlogCtlr.fetchAllcomments);
module.exports = router;