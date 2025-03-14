import { Router } from 'express';
import { getAnalytics } from '../controllers/analyticsController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';


const router = Router();
router.get('/analytics', authMiddleware, roleMiddleware('Admin'), getAnalytics);
export default router;