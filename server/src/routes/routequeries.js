import express from "express";
import {baseValidator} from "../middleware/validation-middleware"
import {QueryController} from "../controllers/queries-controller";
import  {loggeduserandadmin}  from "../middleware/admin";
const router = express.Router();

/**
 * @swagger
 * /queries:
 *   get:
 *     tags:
 *       - Queries
 *     name: Query
 *     summary: fetch all queries
 *     consumes:
 *        - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *             description: Queries successfully fetched.
 *       401:
 *             description: unauthorized
 * */

 router.get("/",loggeduserandadmin.checkAdmin,  QueryController.getQueries);

/**
 * @swagger
 * /queries:
 *   post:
 *     tags:
 *       - Queries
 *     name: Query
 *     summary: Creates a query
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                First_Name:
 *                 type: string
 *                Last_Name:
 *                 type: string
 *                message:
 *                 type: string
 *         required:
 *                -First_Name
 *                -Last_Name
 *                -message
 *     responses:
 *       201:
 *             description: query created successfully.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: server down.
 * */

router.post("/", baseValidator.queryvalidation, QueryController.createQueries);

/**
 * @swagger
 * /queries/{id}:
 *   get:
 *     tags:
 *       - Queries
 *     name: Query
 *     summary: fetch single query
 *     consumes:
 *        - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Query successfully fetched.
 *       401:
 *             description: unauthorized
 * */

router.get("/:id",loggeduserandadmin.checkAdmin, QueryController.getSingleQuery);

export default router;