import Express from "express";
import BillController from "../controllers/bill_controllers.js";

const router = Express.Router();

// User Routes
router.get('/bills', BillController.get);
router.post('/bills/add', BillController.insert);
router.delete('/bills/delete', BillController.delete);

export default router;