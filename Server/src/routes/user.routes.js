import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(upload.single("file"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
// router.route("/register").post(
//     upload.fields([
//       {
//         name: "avatar",
//         maxCount: 1,
//       },
//     ]),
//     registerUser
//   );
