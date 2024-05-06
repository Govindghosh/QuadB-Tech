import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Todo } from "../models/todo.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";
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
const deleteTodo = asyncHandler(async (req, res) => {
  const taskId = req.params.taskId; // Correct way to access task ID from route parameters
  console.log("taskId from server log 52 deleteTodo", taskId);

  // Find and delete the task by its ID
  const deletedTask = await Todo.findByIdAndDelete(taskId);
  console.log("delete Task 55", deletedTask.media);
  if (!deletedTask) {
    throw new ApiError(404, "Task not found");
  }
  await deleteOnCloudinary(deletedTask.media);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});

const editTask = asyncHandler(async (req, res) => {
  const taskId = req.params.taskId; // Assuming the task ID is passed as a route parameter
  if (!isValidObjectId(taskId)) {
    throw new ApiError(400, "video id is not matched in the Collection");
  }
  const { title, description, completed } = req.body;
  const mediaFiles = req.files.media; // Changed to plural, assuming it's an array
  const mediaFileLocalPath =
    mediaFiles && mediaFiles.length > 0 ? mediaFiles[0].path : undefined; // Check if mediaFiles exists and is an array before accessing its elements
  if (
    (!title || title.trim() === "") &&
    (!description || !description.trim() === "") &&
    !completed &&
    !mediaFileLocalPath
  ) {
    throw new ApiError(400, "Atleast one field is required");
  }
  const media = await Todo.findById(Todo.media);

  const todo = await Todo.findById(taskId);

  if (!todo) {
    throw new ApiError(404, "Task not found");
  }

  if (req.user._id.toString() !== todo.user.toString()) {
    throw new ApiError(403, "You are not the owner of this task");
  }
  const mediaFile = await uploadOnCloudinary(mediaFileLocalPath);
  console.log("line 95 mediaFile", mediaFile.url);
  if (!mediaFile.url) {
    throw new ApiError(500, "Error while uploading files and getting the URL");
  }

  if (mediaFile.url !== "") {
    await deleteOnCloudinary(todo.media);
  }
  // Find and update the task by its ID
  try {
    let updatedTodo;
    if (title && description && completed && mediaFile.url) {
      updatedTodo = await Todo.findByIdAndUpdate(
        taskId,
        {
          $set: {
            title: title,
            description: description,
            completed,
            media: mediaFile.url,
          },
        },
        { new: true }
      );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, updatedTodo, "Video updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "internal server error");
  }
});

export { addTask, viewTasks, deleteTodo, editTask };
