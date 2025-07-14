const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback');
const { authenticate } = require('../middlewares/authMiddleware');

// 📝 Create feedback for an event
router.post('/', authenticate, feedbackController.createFeedback);

// 📥 Get all feedbacks for a specific event
router.get('/event/:eventId', feedbackController.showAllFeedbacks);

// 🧪 [Optional] GET feedback creation form (mostly for frontend views, not APIs)
router.get('/create', feedbackController.showCreateFeedbackForm);

module.exports = router;
