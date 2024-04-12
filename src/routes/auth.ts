import { Router } from "express";
import passport from "passport";
import checkRedisToken from "../middleware/checkRedisToken";
import {
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  signUp,
  user,
  validateToken,
} from "../useCases/auth";

const router = Router();
import PP from "../config/passport";
PP(passport);

/**
 * (POST Method)
 */

// //SignIn
router.post("/login", login);
router.post("/sign-up", signUp);

router.post("/request-password-reset", requestPasswordReset);

router.post("/validate-token", validateToken);

router.post("/reset-password", resetPassword);

// User NOTE: Perhaps not needed
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  checkRedisToken,
  user
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  checkRedisToken,
  logout
);

export default router;

// 1. User signs up => Email to reset password
// 2. User requests password reset => Email to reset password (and confirm)
// 3. User requests recover account => Email sent to reset password and confirm

// 2 and 3 should be the same endpoint and front end
