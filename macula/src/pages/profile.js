// import React from 'react';

// const Profile = () => {
//   // Retrieve user information from local storage
//   const user = JSON.parse(localStorage.getItem('user'));

//   return (
//     <div className="profile-page">
//       <h1>Profile</h1>
//       <div className="profile-container">
//         <h2>Personal Information</h2>
//         <div className="profile-data">
//           <div className="profile-field">
//             <label>ID:</label>
//             <span>{user.student ? user.student.ID : user.educator.ID}</span>
//           </div>
//           <div className="profile-field">
//             <label>Name:</label>
//             <span>{user.student ? user.student.name : user.educator.name}</span>
//           </div>
//           <div className="profile-field">
//             <label>Email:</label>
//             <span>{user.student ? user.student.email : user.educator.email}</span>
//           </div>
//           {/* Add more profile information fields as needed */}
//         </div>
//       </div>
//       {user.student && (
//         <div className="rewards-container">
//           <h2>Rewards</h2>
//           {/* Add reward-related content for students */}
//           <p>Student-specific reward information goes here.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useState, useEffect } from 'react';
// import { FaMedal } from 'react-icons/fa';
// import axios from 'axios';

// const Profile = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [engagementRecords, setEngagementRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [medalsEarned, setMedalsEarned] = useState(
//     parseInt(localStorage.getItem('medalsEarned')) || 0
//   );

//   useEffect(() => {
//     fetchEngagementRecords();
//   }, [user]);

//   const fetchEngagementRecords = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`/api/engagement/student/${user.student.ID}`);
//       setEngagementRecords(response.data.engagementRecords);
//       setLoading(false);
//       setError('');
//       // Update the number of medals earned based on the number of engagement records
//       setMedalsEarned(response.data.engagementRecords.length);
//     } catch (error) {
//       console.error('Error fetching engagement records:', error);
//       setError('Error fetching engagement records');
//       setLoading(false);
//       setEngagementRecords([]);
//     }
//   };
  
//   useEffect(() => {
//     localStorage.setItem('medalsEarned', medalsEarned);
//   }, [medalsEarned]);

//   return (
//     <div className="profile-page">
//       <h1>Profile</h1>
//       <div className="profile-container">
//         <h2>Personal Information</h2>
//         <div className="profile-data">
//           <div className="profile-field">
//             <label>ID:</label>
//             <span>{user.student ? user.student.ID : user.educator.ID}</span>
//           </div>
//           <div className="profile-field">
//             <label>Name:</label>
//             <span>{user.student ? user.student.name : user.educator.name}</span>
//           </div>
//           <div className="profile-field">
//             <label>Email:</label>
//             <span>{user.student ? user.student.email : user.educator.email}</span>
//           </div>
//         </div>
//       </div>
//       {user.student && (
//         <div className="rewards-container">
//           <h2>Rewards</h2>
//           <div className="medal-container">
//             {/* Render the earned medals */}
//             {Array.from({ length: medalsEarned }).map((_, index) => (
//               <FaMedal key={index} color="#EF5423" size={50} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { FaMedal } from 'react-icons/fa';
import axios from 'axios';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [engagementRecords, setEngagementRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [medalsEarned, setMedalsEarned] = useState(
    parseInt(localStorage.getItem('medalsEarned')) || 0
  );

  useEffect(() => {
    fetchEngagementRecords();
  }, [user]);

  const fetchEngagementRecords = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/engagement/student/${user.student.ID}`);
      setEngagementRecords(response.data.engagementRecords);
      setLoading(false);
      setError('');
      // Update the number of medals earned based on the number of engagement records with longest_focus_duration >= 1
      const filteredRecords = response.data.engagementRecords.filter(record => record["Longest Focus Duration"] >= 1);
      setMedalsEarned(filteredRecords.length);
    } catch (error) {
      console.error('Error fetching engagement records:', error);
      setError('Error fetching engagement records');
      setLoading(false);
      setEngagementRecords([]);
    }
  };
  
  useEffect(() => {
    localStorage.setItem('medalsEarned', medalsEarned);
  }, [medalsEarned]);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-container">
        <h2>Personal Information</h2>
        <div className="profile-data">
          <div className="profile-field">
            <label>ID:</label>
            <span>{user.student ? user.student.ID : user.educator.ID}</span>
          </div>
          <div className="profile-field">
            <label>Name:</label>
            <span>{user.student ? user.student.name : user.educator.name}</span>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <span>{user.student ? user.student.email : user.educator.email}</span>
          </div>
        </div>
      </div>
      {user.student && (
        <div className="rewards-container">
          <h2>Rewards</h2>
          <div className="medal-container">
            {/* Render the earned medals */}
            {Array.from({ length: medalsEarned }).map((_, index) => (
              <FaMedal key={index} color="#EF5423" size={50} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
