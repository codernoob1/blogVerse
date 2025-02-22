import { useState, useEffect } from 'react';
import { Mail, MapPin, Link as LinkIcon, Edit2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/useAuth.js';

const Profile = () => {
  const { user } = useAuth();  // Get authenticated user from context
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    location: '',
    website: '',
    bio: '',
    avatar: '',
  });

  // Fetch user profile from the backend
  useEffect(() => {
    if (user) {
      axios.get(`/api/users/${user._id}`)
        .then(response => setProfile(response.data.user))
        .catch(error => console.error('Error fetching profile:', error));
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${user._id}`, profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-24">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative h-48 bg-emerald-600">
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="absolute top-4 right-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-50"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
          <img
            src={profile.avatar || "https://via.placeholder.com/150"}
            alt={profile.username}
            className="absolute bottom-0 left-8 transform translate-y-1/2 w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>

        <div className="pt-20 px-8 pb-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500"
                  />
                ) : profile.username}
              </h1>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  {profile.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500"
                    />
                  ) : profile.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <LinkIcon className="h-5 w-5 mr-2" />
                  {isEditing ? (
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500"
                    />
                  ) : (
                    <a href={profile.website} className="text-emerald-600 hover:underline">{profile.website}</a>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500"
                  rows={4}
                />
              ) : (
                <p className="text-gray-600">{profile.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
