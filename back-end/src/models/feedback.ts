import mongoose from 'mongoose';
const feedbackSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true 
    },
  message: { 
    type: String, 
    required: true, 
    minlength: 10 
    },
  created_at: { 
    type: Date, 
    default: Date.now 
    },
});
export default mongoose.model('Feedback', feedbackSchema);