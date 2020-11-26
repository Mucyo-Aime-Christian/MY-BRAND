import Query from "../models/queries";
import {Response} from "../helpers/response";

export class QueryController {
  static async getQueries(req, res) {
    try {
      const queries = await Query.find();
      Response.success(res, 200, "Queries fetched successfully", queries);
    } catch (err) {
      console.log("ooooooo")
      Response.error(res, 500, err.message);
    }
  }

  static async getSingleQuery(req, res) {
    try{
      const queries = await Query.findOne({_id: req.params.id});
   		Response.success(res, 200,"Query fetched successfully", queries);
    } catch (err) {
      Response.error(res, 500, err.message);  
    }
  }

  static async createQueries(req, res) {
    try {
      const query = await Query.create({
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
    		message: req.body.message,
      });
      Response.success(res, 201,"Query sent successfully", query);
    } catch (err) {
      Response.error(res, 500, err.message);
    }
  }
}