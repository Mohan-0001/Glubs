const Feedback = require('../schema/feedback');

// 📝 Show all feedback for a specific event
exports.showAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ event: req.params.eventId })
      .populate('user', 'name')  // optional, to show user's name
      .populate('event', 'title'); // optional, to confirm event
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Error retrieving feedbacks', error: error.message });
  }
};

// ➕ Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({
      message: "Feedback submitted successfully!",
      feedback
    });
  } catch (err) {
    console.error('Error creating feedback:', err);
    res.status(400).json({ error: err.message });
  }
};

// 🎨 Show create feedback form (if using EJS)
exports.showCreateFeedbackForm = (req, res) => {
  // res.render('html/createFeedback.ejs');
};
