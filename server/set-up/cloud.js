const cloudinary = require('cloudinary').v2;
const Response = require('../helpers/response');
cloudinary.config({
    cloud_name:'mucyo',
    api_key:'469891183823114',
    api_secret:'nzEyftYsreLNX7KDxdDqYnq6CDc',
});
const uploadToCloud = async (file, res) => {
  try {
    const image = await cloudinary.uploader.upload(file.path, {
      folder: "MY-BRAND",
      use_filename: true,
    });
    return image;
  } catch (error) {
    return Response.error(res, 500, error);
  }
};

module.exports = uploadToCloud;