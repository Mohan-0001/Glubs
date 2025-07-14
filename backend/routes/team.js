const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team");
const { authenticate } = require("../middlewares/authMiddleware");

// Create team
router.post("/", authenticate, teamController.createTeam);

// Join team
router.post("/join/:teamId", authenticate, teamController.joinTeam);

// View team
router.get("/:teamId", authenticate, teamController.getTeam);

module.exports = router;
