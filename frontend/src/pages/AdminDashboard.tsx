import { useState, useEffect } from 'react';
import axios from 'axios';


const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [analytics, setAnalytics] = useState({ totalFeedbacks: 0, result: [] });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const [feedbackRes, analyticsRes] = await Promise.all([
        axios.get('http://localhost:3000/api/feedbacks', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:3000/api/analytics', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setFeedbacks(feedbackRes.data);
      setAnalytics(analyticsRes.data);
    };
    fetchData();
  }, [token]);

  return (<div className="max-w-5xl mx-auto p-6">
    {/* Header Section */}
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Overview of feedback analytics and submissions</p>
    </header>
  
    {/* Stats Overview */}
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Analytics Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Feedbacks</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">{analytics.totalFeedbacks}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-medium text-gray-600">Top Contributors</h3>
          <ul className="mt-3 space-y-3">
            {analytics.result.map((u:any) => (
              <li 
                key={u._id} 
                className="flex justify-between items-center text-gray-700"
              >
                <span className="truncate">{u.name}</span>
                <span className="ml-4 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {u.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  
    {/* Feedback List */}
    <section>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Feedback</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {feedbacks.reverse().map((f:any) => (
            <li 
              key={f._id} 
              className="p-5 hover:bg-gray-50 transition-colors text-gray-700"
            >
              {f.message}
            </li>
          ))}
        </ul>
      </div>
    </section>
  </div>
  );
};

export default AdminDashboard;