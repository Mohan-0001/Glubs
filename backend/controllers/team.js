// controllers/team.js
const Team = require('../schema/team');
const Event = require('../schema/event');

exports.createTeam = async (req, res) => {
  const { teamName, eventId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event || !event.isTeamEvent) {
      return res.status(400).json({ message: "Event is not team-based" });
    }

    const team = new Team({
      teamName,
      eventId,
      members: [req.user._id],
      createdBy: req.user._id
    });

    await team.save();
    res.status(201).json({ message: "Team created", team });
  } catch (err) {
    res.status(400).json({ message: "Error creating team", error: err.message });
  }
};

exports.joinTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId).populate("eventId");

    if (!team) return res.status(404).json({ message: "Team not found" });

    if (team.members.includes(req.user._id)) {
      return res.status(400).json({ message: "Already in the team" });
    }

    if (team.members.length >= team.eventId.maxTeamSize) {
      return res.status(400).json({ message: "Team is full" });
    }

    team.members.push(req.user._id);
    await team.save();

    res.status(200).json({ message: "Joined team", team });
  } catch (err) {
    res.status(400).json({ message: "Error joining team", error: err.message });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId)
      .populate("members", "name email")
      .populate("eventId", "title");

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.status(200).json(team);
  } catch (err) {
    res.status(400).json({ message: "Error fetching team", error: err.message });
  }
};
