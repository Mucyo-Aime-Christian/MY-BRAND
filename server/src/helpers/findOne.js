import { Response } from "../helpers/response";
import User from "../models/userauth";
import Blog from "../models/blogmodels"

 export class findings {
  static async findById(req, res) {
    try {
      const result = await User.findById(req.params.id);
      return result;
    } catch (error) {
      return Response.error(res, 404, "user Not Found");
    }
  }
  static async findBlogById(req, res) {
    try {
      const result = await Blog.findById(req.params.id);
      return result;
    } catch (error) {
      return Response.error(res, 404, "blog Not Found");
    }
  }

  static async findOne(req, res) {
    try {
      const founduser = await User.findOne({email: req.body.email });
      return founduser;
    } catch (error) {
      return Response.error(res, 500, "Something went wrong!");
    }
  }
}
