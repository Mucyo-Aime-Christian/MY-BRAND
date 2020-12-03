import "@babel/polyfill";
import express from "express";
import mongoose from "mongoose";
import queryRoutes from "../routes/routequeries";
import commentRoutes from "../routes/routeComments";
import blogRoutes from "../routes/routeBlogs";
import userRoutes from "../routes/RoutesUser";
import {DATABASE_URL} from "../set-up/env"
import { setUpSwaggerUi } from "../swagger";
import {swaggerUi} from "swagger-ui-express";
import {swaggerJsdocs} from "swagger-jsdoc";


//******************************** */
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Mr Chris Portfolio",
//       version: "0.1.0",
//       description:
//         "This is a simple CRUD API application made with Express and documented with Swagger",
//       license: {
//         name: "MIT",
//         url: "https://spdx.org/licenses/MIT.html",
//       },
//       contact: {
//         name: "Mr Chris",
//         url: "https://logrocket.com",
//         email: "info@email.com",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:5000/api",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };

// const specs = swaggerJsdocs(options);
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(specs)
//);
//******************************** */


// const Definitions = () => ({
//   info: {
//     title: "Mr Chris Portfolio",
//     description: " Mr Chris website and blog portfolio ",
//   },
//   schemes: ["http", "https"],
//   basePath: "/api/",
//   produces: ["application/json"],
// });

// const swaggerDocs = swaggerJSDocs({
//   swaggerDefinition: Definitions(),
//   apis: ["src/routes/*.js"],
// });

// const docsOption = {
//   customSiteTitle: "MY-BRAND",
// };
// export const setUpSwaggerUi = (app) => {
//   app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.serveFiles(swaggerDocs, docsOption)
//   );
//   app.get("/api-docs", (req, res) => {
//     return res.send(swaggerUi.generateHTML(swaggerDocs, docsOption));
//   });
// };
 
const app = express();
import {config} from "dotenv"; 
config()
mongoose
	.connect(DATABASE_URL, 
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true, 
		useFindAndModify: false,
	}
	)
	.then(() => {
		
		app.use(express.json());
		app.use("/uploads", express.static("uploads")); 
		app.use("/api/queries", queryRoutes);
		app.use("/api/blogs", blogRoutes);
		app.use("/api/comments", commentRoutes);
		app.use("/api/users", userRoutes);
		app.use(express.urlencoded({ extended: false }));
        setUpSwaggerUi(app);
        app.use("*", (req,res)=>{
			res.status(404).json({message:"error accessing route"}); 
		});
        
		
		app.listen(5000, () => 
		{
			console.log("Server has started!")
		})
	})
	.catch((err) => 
	console.log("something went wrong", err.message));

	export default app;