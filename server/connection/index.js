import express from "express";
import mongoose from "mongoose";
import queryRoutes from "../routes/routequeries";
import commentRoutes from "../routes/routeComments";
import blogRoutes from "../routes/routeBlogs";
import userRoutes from "../routes/RoutesUser";

const app = express();
import {config} from "dotenv"; 
config()
mongoose
	.connect("mongodb://localhost:27017/MY-BRAND", 
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
		app.listen(5000, () => 
		{
			console.log("Server has started!")
		})
	})
	.catch((err) => 
	console.log("something went wrong", err.message));