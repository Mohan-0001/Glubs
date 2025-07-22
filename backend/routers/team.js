const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');
const { isAuthenticated } = require('../middlewares/auth');

// All routes require authentication
router.use(isAuthenticated);

// Team management routes
router.post('/create', teamController.createTeam);
router.get('/my-teams', teamController.getUserTeams);
router.get('/event/:eventId/available-users', teamController.getAvailableUsers);
router.get('/event/:eventId/teams', teamController.getEventTeams);
router.post('/send-invitation', teamController.sendTeamInvitation);
router.post('/register/:teamId', teamController.registerTeam);

// Invitation handling routes
router.get('/invite/:inviteCode', teamController.getTeamByInviteCode);
router.post('/respond-invitation', teamController.respondToInvitation);

module.exports = router;