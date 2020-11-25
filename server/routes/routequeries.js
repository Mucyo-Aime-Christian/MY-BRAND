const express = require("express");
const base_validator = require("../middleware/validation-middleware")
const queryctrler = require("../controllers/queries-controller");
const  {checkAdmin}  = require("../middleware/admin");
const router = express.Router();

router.post("/", base_validator.queryvalidation, queryctrler.createQueries);
router.get("/",checkAdmin,  queryctrler.getQueries);
router.get("/:id",checkAdmin, queryctrler.getSingleQuery);

module.exports = router;