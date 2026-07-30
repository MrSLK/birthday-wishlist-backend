import { Router } from "express";
import { getGifts, createGift, reserveGift } from "../controllers/gift.controller";

const router = Router();

router.get("/", getGifts);
router.post("/", createGift);
router.patch("/:id/reserve", reserveGift);

export default router;