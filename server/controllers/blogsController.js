import Blog from "../models/blogmodels";
import {Response} from "../helpers/response";
import Comment from "../models/commentsModel";
import {uploadToCloud} from "../set-up/cloud";

export class BlogsController {
  static async fetchAllBlogs(req, res) {
    try {
      const blogs = await Blog.find();
      Response.success(res, 200, "blogs fetched successfully", blogs);
    } catch (error) {
      Response.error(res, 500, error);
    }
  }

  static async createBlogs(req, res) {
    
    try {
      if (!req.file) return Response.error(res, 400, "Blog image is required");
      const image = await uploadToCloud(req.file, res);
      const blog = await Blog.create({
        title: req.body.title,
        description: req.body.description,
        blogImage: image.url,
       
      });
      Response.success(res, 201, "you created a blog successfully", blog);
    } catch (error) {
      Response.error(res, 500, "blog not created");
    }
  }

  static async fetchSingleBlog(req, res) {
    try {
      const blog = await Blog.findOne(
      {
         _id: req.params.id 
      }
      ).populate( "comments");
      if (blog === null) return Response.error(res, 404, "Blog does not exist");
      return Response.success(res, 200, "Blog fetched successfully", blog);
    } catch (error) {
      Response.error(res, 404, "Blog not fetched");
    }
  }

  static async updateBlog(req, res) {
    
    try {
      const image = await uploadToCloud(req.file, res);
      const update= await Blog.findOneAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          blogImage: image.url,
        },
         { new: true }
      );
      if (update=== null)
        return Response.error(res, 404, "blog not fetched");
      return Response.success(res, 200, "Sucessfully Updated the blog",update );
    } catch (error) {
      return Response.error(res, 404, "blog not updated");
    }
  }

  static async deleteBlog(req, res) {
    try {
      const delet = await Blog.findByIdAndRemove(req.params.id);
      if (delet === null)
        return Response.error(res, 404, "blog not fetched");
      return Response.success(
        res,
        200,
        "Sucessfully deleted the blog",
        delet
      );
    } catch (error) {
      return Response.error(res, 404, "blog not fetched");
    }
  }

  static async addComment(req, res) {
    const blogId = req.params.id;
    if (!blogId) return Response.error(res, 400, "Blog Id required");
    const blog = await Blog.findById(blogId);
    if (!blog) return Response.success(res, 404, "Blog Not Fetched");
    try {
      const comment = new Comment(
        { 
          Name: req.body.Name,
          Email: req.body.Email,
          comment: req.body.comment 
        }
        );
      await comment.save();
      blog.comments.push(comment);
      await blog.save();
      return Response.success(res,201,"Comment submitted", comment);
    } catch (error) {
      return Response.error(res, 500, "error occured");
    }
  }
  static async fetchAllcomments(req, res) {
    try {
      const comment = await Comment.find();
      Response.success(res, 200, "comments fetched successfully", comment);
    } catch (error) {
      Response.error(res, 500, "comments not fetched");
    }
  }
}