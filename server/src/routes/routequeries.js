import express from "express";
import {baseValidator} from "../middleware/validation-middleware"
import {QueryController} from "../controllers/queries-controller";
import  {loggeduserandadmin}  from "../middleware/admin";
const router = express.Router();

router.post("/", baseValidator.queryvalidation, QueryController.createQueries);
router.get("/",loggeduserandadmin.checkAdmin,  QueryController.getQueries);
router.get("/:id",loggeduserandadmin.checkAdmin, QueryController.getSingleQuery);

export default router;