import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addTask } from "../controllers/todo.controller.js";

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

export default router;
