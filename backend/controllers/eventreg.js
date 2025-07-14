const EventRegistration = require('../schema/eventRegistration');

// 📋 Show all event registrations
exports.showAllEventRegistrations = async (req, res) => {
  try {
    const registrations = await EventRegistration.find()
      .populate('eventId', 'title date')      // Optional for clarity
      .populate('userId', 'name department'); // Optional for display
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching event registrations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔍 Show single event registration
exports.showEventRegistration = async (req, res) => {
  try {
    const registration = await EventRegistration.findById(req.params.id)
      .populate('eventId', 'title')
      .populate('userId', 'name');

    if (!registration) {
      return res.status(404).json({ message: 'Event registration not found' });
    }

    res.status(200).json(registration);
  } catch (error) {
    console.error('Error fetching event registration:', error);
    res.status(400).json({ message: 'Invalid registration ID', error: error.message });
  }
};

// ➕ Create new registration
exports.createEventRegistration = async (req, res) => {
  try {
    const newRegistration = new EventRegistration(req.body);
    const saved = await newRegistration.save();

    res.status(201).json({
      message: 'Event registration created successfully!',
      registration: saved
    });
  } catch (error) {
    console.error('Error creating event registration:', error);
    res.status(400).json({
      message: 'Error creating event registration',
      error: error.message
    });
  }
};

// ✏️ Update event registration
exports.updateEventRegistration = async (req, res) => {
  try {
    const updated = await EventRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Event registration not found' });
    }

    res.status(200).json({
      message: 'Event registration updated successfully!',
      registration: updated
    });
  } catch (error) {
    console.error('Error updating event registration:', error);
    res.status(400).json({
      message: 'Error updating event registration',
      error: error.message
    });
  }
};

// ❌ Delete a registration
exports.deleteEventRegistration = async (req, res) => {
  try {
    const deleted = await EventRegistration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Event registration not found' });
    }

    res.status(200).json({
      message: 'Event registration deleted successfully!',
      registration: deleted
    });
  } catch (error) {
    console.error('Error deleting event registration:', error);
    res.status(400).json({
      message: 'Error deleting event registration',
      error: error.message
    });
  }
};
