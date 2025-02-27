import { Router } from "express";
import productRouter from "./products.js"
import userRouter from "./users.js"

const router = Router();
router.use(productRouter);
router.use(userRouter);

export default router;