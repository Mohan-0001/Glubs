import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users, Crown, CheckCircle, XCircle, Calendar, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../Pages/Navbar';
import Footer from '../Pages/Footer';

const TeamInvite = () => {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    fetchTeamDetails();
  }, [inviteCode]);

  const fetchTeamDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/teams/invite/${inviteCode}`, {
        withCredentials: true
      });
      setTeam(response.data.data.team);
    } catch (error) {
      console.error('Error fetching team details:', error);
      toast.error('Invalid or expired invite link');
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (response) => {
    setResponding(true);
    try {
      await axios.post('http://localhost:3000/teams/respond-invitation', {
        inviteCode,
        response
      }, { withCredentials: true });
      
      toast.success(`Invitation ${response}ed successfully!`);
      
      if (response === 'accept') {
        navigate(`/events/${team.event._id}/team-room`);
      } else {
        navigate('/events');
      }
      
    } catch (error) {
      console.error('Error responding to invitation:', error);
      toast.error(error.response?.data?.message || 'Failed to respond to invitation');
    } finally {
      setResponding(false);
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

  if (!team) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-red-600">Team invitation not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-indigo-100 p-4 rounded-full w-20 h-20 mx-auto mb-4">
            <Users className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Team Invitation</h1>
          <p className="text-gray-600">You've been invited to join a team!</p>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{team.event.title}</h2>
              <p className="text-gray-600">Event Details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-semibold text-gray-800">Date</p>
                <p className="text-gray-600">{new Date(team.event.date).toLocaleDateString()}</p>
              </div>
            </div>
            
            {team.event.venue && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">Venue</p>
                  <p className="text-gray-600">{team.event.venue}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-semibold text-gray-800">Team Size</p>
                <p className="text-gray-600">{team.minMembers} - {team.maxMembers} members</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-semibold text-gray-800">Participation</p>
                <p className="text-gray-600">{team.event.participationType}</p>
              </div>
            </div>
          </div>

          {team.event.description && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{team.event.description}</p>
            </div>
          )}
        </div>

        {/* Team Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{team.name}</h3>
              <p className="text-gray-600">Team you're invited to join</p>
            </div>
          </div>

          {team.description && (
            <div className="mb-6">
              <p className="text-gray-700">{team.description}</p>
            </div>
          )}

          {/* Team Leader */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Team Leader</h4>
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <Crown className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-semibold text-gray-800">{team.leader.username}</p>
                <p className="text-sm text-gray-600">{team.leader.email}</p>
              </div>
            </div>
          </div>

          {/* Current Team Members */}
          {team.members.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Current Team Members</h4>
              <div className="space-y-3">
                {team.members.map((member, index) => (
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
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                      member.status === 'accepted' ? 'text-green-600 bg-green-100' :
                      member.status === 'declined' ? 'text-red-600 bg-red-100' :
                      'text-yellow-600 bg-yellow-100'
                    }`}>
                      {member.status === 'accepted' ? <CheckCircle className="w-4 h-4" /> :
                       member.status === 'declined' ? <XCircle className="w-4 h-4" /> :
                       <Users className="w-4 h-4" />}
                      <span className="capitalize">{member.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Team Status</p>
                <p className="text-sm text-gray-600">
                  {team.members.filter(m => m.status === 'accepted').length + 1} / {team.maxMembers} members
                </p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                team.status === 'complete' ? 'bg-green-100 text-green-800' :
                team.status === 'registered' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {team.status === 'complete' ? 'Ready to Register' :
                 team.status === 'registered' ? 'Registered' :
                 'Forming Team'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Respond to Invitation</h3>
            <p className="text-gray-600">Would you like to join this team?</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleResponse('accept')}
              disabled={responding}
              className="flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg transition-colors font-semibold"
            >
              <CheckCircle className="w-5 h-5" />
              {responding ? 'Processing...' : 'Accept Invitation'}
            </button>
            
            <button
              onClick={() => handleResponse('decline')}
              disabled={responding}
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-lg transition-colors font-semibold"
            >
              <XCircle className="w-5 h-5" />
              {responding ? 'Processing...' : 'Decline Invitation'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/events')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeamInvite;