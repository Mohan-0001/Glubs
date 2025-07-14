const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
const { verifyToken } = require('../middlewares/authMiddleware');

// 📥 Create a new event (protected)
router.post('/', verifyToken, eventController.createEvent);

// 📄 Get all events
router.get('/', eventController.showAllEvents);

// 🔍 Get a single event by ID
router.get('/:id', eventController.showEvent);

// ✏️ Update an event (protected)
router.put('/:id', verifyToken, eventController.updateEvent);

// ❌ Delete an event (protected)
router.delete('/:id', verifyToken, eventController.deleteEvent);

// 🧪 (Optional) Render event creation form
router.get('/create/new', eventController.showCreateEventForm);

// ❓ FIX OR REMOVE: If this route is needed, make sure it's implemented in controller
router.get('/details/:id', eventController.showEventDetails);

module.exports = router;