import { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import { jwtDecode } from 'jwt-decode';

const UserDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem('token');
  let userData:{
    id:number
  }
  if(token){
    userData=jwtDecode(token)
    console.log(userData);
  }
  
  
  useEffect(() => {
    const fetchFeedback = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/feedback/${userData.id}`, { headers: { Authorization: `Bearer ${token}` } });
      setFeedbacks(data);
    };
    fetchFeedback();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl mb-4">User Dashboard</h1>
      <FeedbackForm setFeedbacks={setFeedbacks} />
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
};

export default UserDashboard;