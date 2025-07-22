const Team = require('../schema/team');
const Event = require('../schema/event');
const User = require('../schema/user');
const sendEmail = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create a new team
exports.createTeam = catchAsync(async (req, res, next) => {
  const { eventId, teamName, description } = req.body;
  
  const event = await Event.findById(eventId);
  if (!event) {
    return next(new AppError('Event not found', 404));
  }

  if (event.participationType !== 'Team') {
    return next(new AppError('This event does not require team participation', 400));
  }

  // Check if user already has a team for this event
  const existingTeam = await Team.findOne({
    event: eventId,
    $or: [
      { leader: req.user._id },
      { 'members.user': req.user._id }
    ]
  });

  if (existingTeam) {
    return next(new AppError('You are already part of a team for this event', 400));
  }

  const team = new Team({
    name: teamName,
    event: eventId,
    leader: req.user._id,
    maxMembers: event.teamMax,
    minMembers: event.teamMin,
    description
  });

  await team.save();
  await team.populate(['leader', 'event', 'members.user']);

  res.status(201).json({
    status: 'success',
    data: { team }
  });
});

// Get available users for team invitation
exports.getAvailableUsers = catchAsync(async (req, res, next) => {
  const { eventId } = req.params;
  
  const event = await Event.findById(eventId);
  if (!event) {
    return next(new AppError('Event not found', 404));
  }

  // Get users who are not already in a team for this event
  const teamsForEvent = await Team.find({ event: eventId });
  const usersInTeams = [];
  
  teamsForEvent.forEach(team => {
    usersInTeams.push(team.leader);
    team.members.forEach(member => {
      if (member.user) usersInTeams.push(member.user);
    });
  });

  // Get users who haven't registered individually for this event
  const registeredUsers = event.registeredUsers || [];
  const excludedUsers = [...new Set([...usersInTeams, ...registeredUsers, req.user._id])];

  const availableUsers = await User.find({
    _id: { $nin: excludedUsers },
    isVerified: true
  }).select('username email department yearOfStudy');

  res.status(200).json({
    status: 'success',
    data: { users: availableUsers }
  });
});

// Send team invitation
exports.sendTeamInvitation = catchAsync(async (req, res, next) => {
  const { teamId, userIds, message } = req.body;
  
  const team = await Team.findById(teamId).populate(['leader', 'event']);
  if (!team) {
    return next(new AppError('Team not found', 404));
  }

  if (team.leader._id.toString() !== req.user._id.toString()) {
    return next(new AppError('Only team leader can send invitations', 403));
  }

  const users = await User.find({ _id: { $in: userIds } });
  
  for (const user of users) {
    // Check if user is already invited
    const alreadyInvited = team.members.some(member => 
      member.user && member.user.toString() === user._id.toString()
    );
    
    if (!alreadyInvited) {
      team.members.push({
        user: user._id,
        status: 'pending'
      });

      // Send invitation email
      const inviteLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/team/invite/${team.inviteCode}`;
      
      try {
        await sendEmail({
          email: user.email,
          subject: `Team Invitation for ${team.event.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4F46E5;">🎯 Team Invitation</h2>
              <p>Hi ${user.username}!</p>
              <p>You've been invited to join team <strong>"${team.name}"</strong> for the event <strong>"${team.event.title}"</strong>.</p>
              
              <div style="background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Team Leader:</strong> ${team.leader.username}</p>
                <p><strong>Event:</strong> ${team.event.title}</p>
                <p><strong>Team Size:</strong> ${team.minMembers} - ${team.maxMembers} members</p>
                ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${inviteLink}" 
                   style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Join Team
                </a>
              </div>
              
              <p style="color: #666; font-size: 14px;">
                This invitation will expire in 48 hours. If you're not interested, you can safely ignore this email.
              </p>
            </div>
          `
        });
      } catch (error) {
        console.error('Failed to send invitation email:', error);
      }
    }
  }

  await team.save();
  await team.populate('members.user');

  res.status(200).json({
    status: 'success',
    message: 'Invitations sent successfully',
    data: { team }
  });
});

// Get team details by invite code
exports.getTeamByInviteCode = catchAsync(async (req, res, next) => {
  const { inviteCode } = req.params;
  
  const team = await Team.findOne({ inviteCode })
    .populate(['leader', 'event', 'members.user']);
    
  if (!team) {
    return next(new AppError('Invalid invite code', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { team }
  });
});

// Respond to team invitation
exports.respondToInvitation = catchAsync(async (req, res, next) => {
  const { inviteCode, response } = req.body; // response: 'accept' or 'decline'
  
  const team = await Team.findOne({ inviteCode });
  if (!team) {
    return next(new AppError('Invalid invite code', 404));
  }

  const memberIndex = team.members.findIndex(member => 
    member.user && member.user.toString() === req.user._id.toString()
  );

  if (memberIndex === -1) {
    return next(new AppError('You are not invited to this team', 400));
  }

  if (team.members[memberIndex].status !== 'pending') {
    return next(new AppError('You have already responded to this invitation', 400));
  }

  team.members[memberIndex].status = response === 'accept' ? 'accepted' : 'declined';
  team.members[memberIndex].respondedAt = new Date();

  // Check if team is complete
  const acceptedMembers = team.members.filter(member => member.status === 'accepted').length;
  if (acceptedMembers + 1 >= team.minMembers && acceptedMembers + 1 <= team.maxMembers) {
    team.status = 'complete';
  }

  await team.save();
  await team.populate(['leader', 'event', 'members.user']);

  res.status(200).json({
    status: 'success',
    message: `Invitation ${response}ed successfully`,
    data: { team }
  });
});

// Get user's teams
exports.getUserTeams = catchAsync(async (req, res, next) => {
  const teams = await Team.find({
    $or: [
      { leader: req.user._id },
      { 'members.user': req.user._id, 'members.status': 'accepted' }
    ]
  }).populate(['leader', 'event', 'members.user']);

  res.status(200).json({
    status: 'success',
    data: { teams }
  });
});

// Register team for event
exports.registerTeam = catchAsync(async (req, res, next) => {
  const { teamId } = req.params;
  
  const team = await Team.findById(teamId).populate('event');
  if (!team) {
    return next(new AppError('Team not found', 404));
  }

  if (team.leader.toString() !== req.user._id.toString()) {
    return next(new AppError('Only team leader can register the team', 403));
  }

  if (team.status !== 'complete') {
    return next(new AppError('Team must be complete before registration', 400));
  }

  // Add team members to event registration
  const acceptedMembers = team.members.filter(member => member.status === 'accepted');
  const allTeamMembers = [team.leader, ...acceptedMembers.map(member => member.user)];

  const event = await Event.findById(team.event._id);
  
  // Add all team members to registered users
  allTeamMembers.forEach(memberId => {
    if (!event.registeredUsers.includes(memberId)) {
      event.registeredUsers.push(memberId);
    }
  });

  team.status = 'registered';
  
  await Promise.all([team.save(), event.save()]);

  res.status(200).json({
    status: 'success',
    message: 'Team registered successfully',
    data: { team }
  });
});

// Get teams for an event
exports.getEventTeams = catchAsync(async (req, res, next) => {
  const { eventId } = req.params;
  
  const teams = await Team.find({ event: eventId })
    .populate(['leader', 'members.user']);

  res.status(200).json({
    status: 'success',
    data: { teams }
  });
});