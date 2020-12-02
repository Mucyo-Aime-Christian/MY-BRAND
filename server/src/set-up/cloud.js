import { v2 as cloudinary } from "cloudinary";
import {Response} from "../helpers/response";

cloudinary.config({
    cloud_name:'mucyo',
    api_key:'469891183823114',
    api_secret:'nzEyftYsreLNX7KDxdDqYnq6CDc',
});
export const uploadToCloud = async (file, res) => {
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