import Joi from "joi";
import {base_response} from "../helpers/base_response";


export class baseValidator {
  static queryvalidation(req, res, next) {
    const schema = Joi.object({
      First_Name: Joi.string().min(3).max(30).required(),
      Last_Name: Joi.string().min(3).max(30).required(),
      message: Joi.string().min(10).max(300).required(),
    });
    base_response(req, res, schema, next);
    
  }

  static commentvalidation(req, res, next) {
    const schema = Joi.object({
      Name: Joi.string().min(3).max(30).required(),
      Email: Joi.string().email().required(),
      comment: Joi.string().min(2).max(300).required(),
    });
    base_response(req, res, schema, next);
  
   }


  static blogvalidation(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(10).max(40).required(),
      description: Joi.string().min(10).required(),
    });
   base_response(req, res, schema, next);
    
  }

  static createuserDataValidate(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    });
    base_response(req, res, schema, next);
  }

  static userLoginValidate(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    });
    base_response(req, res, schema, next);
  }
}
