import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createReply, deleteReply, updateReply } from "../controllers/replies.js";

const router = new Router();

// create reply
// http://localhost:8080/api/replies/:id
router.post('/:id', checkAuth, createReply);

// update reply
// http://localhost:8080/api/replies/:id
router.put('/:id', checkAuth, updateReply);

// delete reply
// http://localhost:8080/api/replies/:id
router.delete('/:id', checkAuth, deleteReply);

export default router;