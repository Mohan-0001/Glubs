const express = require('express');
const router = express.Router();

const eventStatsController = require('../controllers/eventstats');
const { authenticate } = require('../middlewares/authMiddleware');

// 📊 Get stats for all events
router.get('/', eventStatsController.showAllEventStats);

// 📈 Get stats for a specific event by eventId
router.get('/:id', eventStatsController.showEventStats);

// ➕ Create initial stats for an event
router.post('/', authenticate, eventStatsController.createEventStats);

// 🔄 Update stats (e.g., views, registrations)
router.put('/:id', authenticate, eventStatsController.updateEventStats);

// ❌ Delete stats (optional, rarely used in prod)
router.delete('/:id', authenticate, eventStatsController.deleteEventStats);

module.exports = router;
