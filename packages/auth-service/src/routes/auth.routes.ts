import { Router } from "express";

const router = Router();

router.post("/signin");
router.post("/signup");
router.post("/signout");
router.post("/refresh-token");

export { router };
