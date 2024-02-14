import { Router } from "express";
import { createPortfolio } from "../controllers/portfolios.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

// create portfolio
// http://localhost:8080/api/portfolios
router.post('/', checkAuth, createPortfolio);

export default router;