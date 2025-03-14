import { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ setFeedbacks }: { setFeedbacks: (f: any) => void }) => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(message.trim().length<10){
        alert('feed back conatain atleast 10 letters')
        return 
      }
      const { data } = await axios.post('http://localhost:3000/api/feedback', { message }, { headers: { Authorization: `Bearer ${token}` } });
      setFeedbacks((prev: any) => [...prev, data.feedback]);
      setMessage('');
    } catch (error) {
      console.error(error);
      alert('error at feedback areea')
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border" placeholder="Enter feedback (min 10 chars)" />
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default FeedbackForm;