const express = require('express');
const router = express.Router();

const eventRegController = require('../controllers/eventreg');
const { authenticate } = require('../middlewares/authMiddleware');

// 🔄 Register a user for an event
router.post('/', authenticate, eventRegController.createEventRegistration);

// 📄 Get all event registrations (admin/club-admin use)
router.get('/', authenticate, eventRegController.showAllEventRegistrations);

// 📥 Get a single event registration by ID
router.get('/:id', authenticate, eventRegController.showEventRegistration);

// ✏️ Update a registration (e.g., mark as attended, cancel)
router.put('/:id', authenticate, eventRegController.updateEventRegistration);

// ❌ Delete a registration
router.delete('/:id', authenticate, eventRegController.deleteEventRegistration);

module.exports = router;
