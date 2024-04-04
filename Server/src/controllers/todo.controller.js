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
  console.log("user object ---", req.user);
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
const viewTasks = asyncHandler(async (req, res) => {
  const tasks = await Todo.find();

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
});
const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id; // Assuming the task ID is passed as a route parameter

  // Find and delete the task by its ID
  const deletedTask = await Todo.findByIdAndDelete(taskId);

  if (!deletedTask) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});
const editTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id; // Assuming the task ID is passed as a route parameter
  const { title, description, completed } = req.body;

  // Find and update the task by its ID
  const updatedTask = await Todo.findByIdAndUpdate(
    taskId,
    { title, description, completed },
    { new: true }
  );

  if (!updatedTask) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});

export { addTask, viewTasks, deleteTask, editTask };
