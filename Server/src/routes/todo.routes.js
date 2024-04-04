import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addTask, viewTasks } from "../controllers/todo.controller.js";

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

router.route("/viewTasks").get(verifyJWT,viewTasks)

export default router;
