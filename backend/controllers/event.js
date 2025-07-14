const Event = require("../schema/event");

// 📄 (Optional) Render event creation form
exports.showCreateEventForm = (req, res) => {
  res.render("html/createEvent.ejs");
};

// 📋 Show all events
exports.showAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Upcoming first
    res.status(200).json(events);
    // Or SSR: res.render("html/events.ejs", { events });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// 🔍 Show one event by ID
exports.showEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Or SSR: res.render("html/eventDetails.ejs", { event });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: "Invalid event ID", error: error.message });
  }
};

// ➕ Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body, 
      clubId: req.user._id
    });
    const saved = await event.save();
    res.status(201).json({
      message: "Event created successfully!",
      event: saved
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(400).json({ message: "Error creating event", error: error.message });
  }
};

// ✏️ Update an event
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({
      message: "Event updated successfully!",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(400).json({ message: "Error updating event", error: error.message });
  }
};

// ❌ Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({
      message: "Event deleted successfully!",
      event: deletedEvent
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(400).json({ message: "Error deleting event", error: error.message });
  }
};


exports.showEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event); // or render a view
  } catch (err) {
    res.status(500).json({ message: 'Failed to get event details', error: err.message });
  }
};
