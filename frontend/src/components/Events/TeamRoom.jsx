import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Users, 
  Plus, 
  Send, 
  Crown, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Mail,
  Search,
  UserPlus,
  Copy,
  ExternalLink
} from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../Pages/Navbar';
import Footer from '../Pages/Footer';

const TeamRoom = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [userTeam, setUserTeam] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [teamForm, setTeamForm] = useState({
    teamName: '',
    description: ''
  });
  
  const [inviteMessage, setInviteMessage] = useState('');

  useEffect(() => {
    fetchEventAndTeamData();
  }, [eventId]);

  const fetchEventAndTeamData = async () => {
    try {
      setLoading(true);
      
      // Fetch event details
      const eventRes = await axios.get(`http://localhost:3000/event/${eventId}`, {
        withCredentials: true
      });
      setEvent(eventRes.data.event);
      
      // Check if user already has a team for this event
      const teamsRes = await axios.get('http://localhost:3000/teams/my-teams', {
        withCredentials: true
      });
      
      const currentTeam = teamsRes.data.data.teams.find(team => 
        team.event._id === eventId
      );
      
      if (currentTeam) {
        setUserTeam(currentTeam);
      } else {
        // Fetch available users for invitation
        const usersRes = await axios.get(`http://localhost:3000/teams/event/${eventId}/available-users`, {
          withCredentials: true
        });
        setAvailableUsers(usersRes.data.data.users);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load team room data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    
    if (!teamForm.teamName.trim()) {
      toast.error('Team name is required');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/teams/create', {
        eventId,
        teamName: teamForm.teamName,
        description: teamForm.description
      }, { withCredentials: true });
      
      setUserTeam(response.data.data.team);
      setShowCreateTeam(false);
      setTeamForm({ teamName: '', description: '' });
      toast.success('Team created successfully!');
      
      // Refresh available users
      const usersRes = await axios.get(`http://localhost:3000/teams/event/${eventId}/available-users`, {
        withCredentials: true
      });
      setAvailableUsers(usersRes.data.data.users);
      
    } catch (error) {
      console.error('Error creating team:', error);
      toast.error(error.response?.data?.message || 'Failed to create team');
    }
  };

  const handleSendInvitations = async () => {
    if (selectedUsers.length === 0) {
      toast.error('Please select at least one user to invite');
      return;
    }
    
    try {
      await axios.post('http://localhost:3000/teams/send-invitation', {
        teamId: userTeam._id,
        userIds: selectedUsers,
        message: inviteMessage
      }, { withCredentials: true });
      
      toast.success(`Invitations sent to ${selectedUsers.length} user(s)`);
      setSelectedUsers([]);
      setInviteMessage('');
      setShowInviteModal(false);
      
      // Refresh team data
      fetchEventAndTeamData();
      
    } catch (error) {
      console.error('Error sending invitations:', error);
      toast.error('Failed to send invitations');
    }
  };

  const handleRegisterTeam = async () => {
    try {
      await axios.post(`http://localhost:3000/teams/register/${userTeam._id}`, {}, {
        withCredentials: true
      });
      
      toast.success('Team registered for event successfully!');
      navigate(`/events/${eventId}`);
      
    } catch (error) {
      console.error('Error registering team:', error);
      toast.error(error.response?.data?.message || 'Failed to register team');
    }
  };

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/team/invite/${userTeam.inviteCode}`;
    navigator.clipboard.writeText(inviteLink);
    toast.success('Invite link copied to clipboard!');
  };

  const filteredUsers = availableUsers.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.department && user.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'declined': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'declined': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-red-600">Event not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Team Room</h1>
              <p className="text-gray-600">Event: <span className="font-semibold text-indigo-600">{event.title}</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Team Size Required</p>
              <p className="text-2xl font-bold text-indigo-600">{event.teamMin} - {event.teamMax}</p>
            </div>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-indigo-800">
              <strong>Team Registration:</strong> This event requires team participation. 
              Create or join a team to register for this event.
            </p>
          </div>
        </div>

        {/* User's Team Section */}
        {userTeam ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{userTeam.name}</h2>
                  <p className="text-gray-600">Team Leader: {userTeam.leader.username}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={copyInviteLink}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy Invite Link
                </button>
                
                {userTeam.status === 'complete' && (
                  <button
                    onClick={handleRegisterTeam}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Register Team
                  </button>
                )}
              </div>
            </div>

            {userTeam.description && (
              <div className="mb-6">
                <p className="text-gray-700">{userTeam.description}</p>
              </div>
            )}

            {/* Team Members */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Members</h3>
              <div className="space-y-3">
                {/* Team Leader */}
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-semibold text-gray-800">{userTeam.leader.username}</p>
                      <p className="text-sm text-gray-600">{userTeam.leader.email}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">Leader</span>
                </div>

                {/* Team Members */}
                {userTeam.members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {member.user ? member.user.username : 'Invited User'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {member.user ? member.user.email : 'Pending response'}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(member.status)}`}>
                      {getStatusIcon(member.status)}
                      <span className="capitalize">{member.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">Team Status</p>
                <p className="text-sm text-gray-600">
                  {userTeam.members.filter(m => m.status === 'accepted').length + 1} / {userTeam.maxMembers} members
                </p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                userTeam.status === 'complete' ? 'bg-green-100 text-green-800' :
                userTeam.status === 'registered' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {userTeam.status === 'complete' ? 'Ready to Register' :
                 userTeam.status === 'registered' ? 'Registered' :
                 'Forming Team'}
              </div>
            </div>

            {/* Invite More Members Button */}
            {userTeam.status !== 'registered' && (
              <div className="mt-6">
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold"
                >
                  <UserPlus className="w-4 h-4" />
                  Invite Members
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Create Team Section */
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Team</h2>
              <p className="text-gray-600">Start by creating a team for this event</p>
            </div>

            {!showCreateTeam ? (
              <div className="text-center">
                <button
                  onClick={() => setShowCreateTeam(true)}
                  className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Create New Team
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateTeam} className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    value={teamForm.teamName}
                    onChange={(e) => setTeamForm({...teamForm, teamName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter team name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Description
                  </label>
                  <textarea
                    value={teamForm.description}
                    onChange={(e) => setTeamForm({...teamForm, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Describe your team (optional)"
                    rows="3"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors font-semibold"
                  >
                    Create Team
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateTeam(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Available Users Section */}
        {!userTeam && availableUsers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Available Students</h3>
            
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Search students by name, email, or department..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <div key={user._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Users className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.username}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <p>Department: {user.department || 'Not specified'}</p>
                    <p>Year: {user.yearOfStudy || 'Not specified'}</p>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    Create a team first to invite students
                  </p>
                </div>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No available students found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Invite Team Members</h3>
              <p className="text-gray-600">Select students to invite to your team</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Search students..."
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Add a personal message to your invitation..."
                  rows="3"
                />
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedUsers.includes(user._id)
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      if (selectedUsers.includes(user._id)) {
                        setSelectedUsers(selectedUsers.filter(id => id !== user._id));
                      } else {
                        setSelectedUsers([...selectedUsers, user._id]);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{user.username}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          {user.department} • {user.yearOfStudy}
                        </p>
                      </div>
                      {selectedUsers.includes(user._id) && (
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedUsers.length > 0 && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-indigo-800">
                    {selectedUsers.length} student(s) selected for invitation
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleSendInvitations}
                disabled={selectedUsers.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-lg transition-colors font-semibold"
              >
                <Send className="w-4 h-4" />
                Send Invitations ({selectedUsers.length})
              </button>
              <button
                onClick={() => {
                  setShowInviteModal(false);
                  setSelectedUsers([]);
                  setInviteMessage('');
                }}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TeamRoom;