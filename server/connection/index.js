const express = require("express")
const mongoose = require("mongoose") 

// Connect to MongoDB database
mongoose
	.connect("mongodb://localhost:27017/MY-BRAND", { useNewUrlParser: true ,useUnifiedTopology: true})
	.then(() => {
		const app = express()
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	}).catch((err) => console.log("something went wrong", err.message));