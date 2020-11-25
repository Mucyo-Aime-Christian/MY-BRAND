const Users =require ('../helpers/findOne');
const User =require ('../models/userauth');
const signToken =require ('../helpers/signToken');
const Response = require('../helpers/response');
const uploadToCloud = require("../set-up/cloud");
const bcrypt = require("bcrypt");

class usercontroller{
  static async createAccount(req, res){
    const user = {
            email:req.body.email,
            password: req.body.password
    };
    try {
        const existUser = await Users.findOne(req,res);
        
        if (existUser) return Response.error(res, 409, "User already created");
         const salt = await bcrypt.genSalt(8);
         var newPassword = await bcrypt.hash(req.body.password, salt); 
        const newUser = await User.create({
            _id: user.id,
            email: user.email, 
            password: newPassword
        });
        return Response.success(res, 201, "User sucessfully created", {newUser, newPassword});
        
    } catch (err) {
       return Response.error(res, 500, "Something went Wrong");
    }
};

static async login (req, res) {
    try {
        const user = { email: req.body.email, password: req.body.password }
        const verifyUser = await Users.findOne(req, res)

        if (!verifyUser) return Response.error(res, 400, "Invalid email or password");
        const verifyPassword = await bcrypt.compare(
          user.password,
          verifyUser.password
          );
        if (!verifyPassword) return Response.error(res, 400, "password  not match");
        const token = signToken(verifyUser);
        const { _id, email } = verifyUser;
        return Response.success(res, 200, "sucessfully logged in", {User: {_id, email}, token});
    } catch (error) {
       return Response.error(res, 500, "Something went wrong"); 
    }
};

static async getUsers (req, res)  {
    try {
        const users = await User.find();
        Response.success(res, 200, "successfully retrieved users",({users: users}) );
        
    } catch (error) {
      return  Response.error(res, 500, "Something went wrong");
    }
};

static async deleteUser(req, res)  {
        try {
           const deletedUser = await User.findByIdAndRemove({_id: req.params.id})
            if (deletedUser === null)
             return Response.error(res, 404, "user not found");
            
            Response.success(res, 200, "successfully deleted user",deletedUser );
            
         } catch (error) {
       return Response.error(res, 500, "Something went wrong");
    }
}

static async updateProfilePicture(req, res) {
    try {
      if (!req.file) return Response.error(res, 400, " image is required");
      if (req.params.id !== req.user._id)
      
      
        return Response.error(res, 403, "Access Denied!");
      const img = await uploadToCloud(req.file, res);
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return Response.error(res, 404, "User not found");
      user.profileImage = img.url;
      user.save();
      return Response.success(res, 200, user);
    } catch (error) {
      return Response.error(res, 500, "Something went wrong");
    }
  }
}
module.exports = usercontroller