import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Todo } from "../models/todo.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addTask = asyncHandler(async (req, res) => {
  const { media, completed, description, title } = req.body;
  if (!title) {
    throw new ApiError(400, "Title is required");
  }
  const existingTask = await Todo.findOne({ title });
  if (existingTask) {
    throw new ApiError(400, "Task with this title already exists");
  }

  let mediaResponse = { url: "" }; // Define mediaResponse with a default value

  // Check if media exists in the request body
  if (req.files?.media?.[0]?.path) {
    const mediaLocalPath = req.files.media[0].path;
    mediaResponse = await uploadOnCloudinary(mediaLocalPath);
  }
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  const newTask = await Todo.create({
    user: user,
    title,
    description,
    completed,
    media: mediaResponse.url || "", // Access mediaResponse.url
  });
  if (!newTask) {
    throw new ApiError(500, "Something went wrong while registering the Task");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, newTask, "Task add successfully"));
});

export { addTask };
