import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addTask,
  viewTasks,
  deleteTodo,
  editTask,
} from "../controllers/todo.controller.js";

const router = Router();

router.route("/add-task").post(
  verifyJWT,
  upload.fields([
    {
      name: "media",
      maxCount: 1,
    },
  ]),
  addTask
);

router.route("/viewTasks").get(verifyJWT, viewTasks);
router.route("/deleteTask/:taskId").delete(verifyJWT, deleteTodo);
router.route("/updateTask/:taskId").patch(
  verifyJWT,
  upload.fields([
    {
      name: "media",
      maxCount: 1,
    },
  ]),
  editTask
);

export default router;
