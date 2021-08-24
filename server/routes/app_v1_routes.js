import Express from "express";
import UserController from "../controllers/user_controllers.js";

const router = Express.Router();

// User Routes
router.get('/users', UserController.getUsers);
router.post('/users/add', UserController.insertUsers);

export default router;