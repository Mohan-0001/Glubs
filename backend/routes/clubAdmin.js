const express = require('express');
const router = express.Router();
const clubAdminController = require('../controllers/clubadmin');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

// 📄 Get all club admins
router.get('/', clubAdminController.showAllClubAdmins);

// 👁️ View a specific club admin
router.get('/:id', clubAdminController.showClubAdmin);

// ➕ Create a new club admin (protected route)
router.post('/', verifyToken, requireRole('admin'), clubAdminController.createClubAdmin);

// ✏️ Update a club admin
router.put('/:id', verifyToken, requireRole('admin'), clubAdminController.updateClubAdmin);

// ❌ Delete a club admin
router.delete('/:id', verifyToken, requireRole('admin'), clubAdminController.deleteClubAdmin);

// 🧪 Optional: Show HTML form for creating a club admin
router.get('/create/form', clubAdminController.showCreateClubAdminForm);

module.exports = router;
