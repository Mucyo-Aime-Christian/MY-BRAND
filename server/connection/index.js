var express = require("express");
const mongoose = require("mongoose"); 
const queryRoutes = require("../routes/routequeries");
const commentRoutes = require("../routes/routeComments");
const blogRoutes = require("../routes/routeBlogs")
const userRoutes = require("../routes/RoutesUser");

const app = express();
require('dotenv').config();
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