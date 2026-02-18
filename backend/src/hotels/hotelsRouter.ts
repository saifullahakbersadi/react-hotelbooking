import { Router } from "express";
import { fetchHotels, searchHotels } from "./hotelsController";

const router = Router();

router.get("/all", fetchHotels);
router.get("/search", searchHotels);

export default router;