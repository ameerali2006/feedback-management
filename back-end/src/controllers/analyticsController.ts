import { Request, Response } from 'express';
import Feedback from '../models/feedback';
import prisma from '../config/mysql';

export const getAnalytics = async (req: Request, res: Response) => {
    try {
        const totalFeedbacks = await Feedback.countDocuments();
        const topUsers = await Feedback.aggregate([
            { $group: { _id: '$userId', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 3 },
        ]);
        const userIds=topUsers.map(user=>user._id)
        const users=await prisma.user.findMany({
            where:{id:{in:userIds}},
            select:{id:true , name:true}
        })
        const result = topUsers.map(user => ({
            userId: user._id,
            name: users.find(u => u.id === user._id)?.name || "Unknown",
            
            count: user.count
          }));
        
        res.json({ totalFeedbacks, result });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'error on analys' });
        
    }
};