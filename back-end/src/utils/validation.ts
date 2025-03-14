import { z } from 'zod';
import { Request,Response,NextFunction } from 'express';
export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['User', 'Admin']).optional(),
});
export const feedbackSchema = z.object({
  message: z.string().min(10, 'Feedback must be at least 10 characters'),
});
export const validate = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
        alert('validation is not correct')
        console.log((error as z.ZodError).errors);
        res.status(400).json({ error: 'Validation failed', details: (error as z.ZodError).errors });
    }
};