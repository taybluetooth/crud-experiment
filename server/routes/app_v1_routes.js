import Express from "express";
import BillController from "../controllers/bill_controllers.js";

const router = Express.Router();

// User Routes
router.get('/bills', BillController.getBills);
router.post('/bills/add', BillController.insertBills);

export default router;