import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
interface AuthRequest extends Request {
    user?: JwtPayload & { id: string; email: string };
  }

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token){
      res.status(401).json({ message: 'No token provided' });
      return
    } 
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err){
          return res.status(401).json({ message: 'Invalid token' });
      } 
      if (decoded && typeof decoded === "object"){
          req.user = decoded as JwtPayload & { id: string; email: string };
      }
      
      next();
    });
  } catch (error) {
    console.error(error);
  }
};