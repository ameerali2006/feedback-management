import { Request, Response } from 'express';
import Feedback from '../models/feedback';

interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const submitFeedback = async (req: AuthRequest, res: Response) => {
  try {
    const { message } = req.body;
    const feedback = await Feedback.create({ userId: Number(req.user!.id), message });
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (error) {
    console.error(error);
    
  }
};

export const getUserFeedback = async (req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find({ userId: Number(req.params.userid) });
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
  }
};

export const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
  }
}; 