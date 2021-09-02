import Express from "express";
import ProductController from "../controllers/product_controllers.js";

const router = Express.Router();

// User Routes
router.get('/products/:id', ProductController.getOne);
router.get('/products', ProductController.getAll);
router.post('/product/add', ProductController.insert);
router.delete('/product/delete', ProductController.delete);
router.put('/product/update', ProductController.update);

export default router;