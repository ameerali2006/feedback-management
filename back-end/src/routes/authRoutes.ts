import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validate,registerSchema } from '../utils/validation';
const router = Router();
router.post('/register',validate(registerSchema), register);
router.post('/login', login);
export default router;