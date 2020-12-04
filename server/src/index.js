import "@babel/polyfill";
import express from "express";
import mongoose from "mongoose";
import queryRoutes from "./routes/routequeries";
import commentRoutes from "./routes/routeComments";
import blogRoutes from "./routes/routeBlogs";
import userRoutes from "./routes/RoutesUser";
import {DATABASE_URL, PORT} from "./set-up/env"

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
		
		console.log("connected to the database")
		
	})
	.catch((err) => 
	console.log("something went wrong", err.message));

app.use(express.json());
app.use("/uploads", express.static("uploads")); 
app.use("/api/queries", queryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use(express.urlencoded({ extended: false }));

app.use("*", (req,res)=>{
	res.status(404).json({message:"Route not found"}); 
});
const port = PORT || 5000;
app.listen(port, () => 
{
	console.log("Server has started!")
})

export default app;