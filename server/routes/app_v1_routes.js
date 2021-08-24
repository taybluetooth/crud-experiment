import Express from "express";
import UserController from "../controllers/user_controllers.js";

const router = Express.Router();

// User Routes
router.get('/users', UserController.getUsers);

export default router;