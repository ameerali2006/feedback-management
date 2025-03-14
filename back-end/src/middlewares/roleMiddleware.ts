import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from "jsonwebtoken";
interface AuthRequest extends Request{
    user?: JwtPayload & { id: string; email: string , role:string };
}
export const roleMiddleware = (role: string) => (req: AuthRequest, res: Response, next: NextFunction) => {
   try {
    if(!req.user){
        res.status(401).json({ message: "Unauthorized" }); 
        return 
    }
    if (req.user.role !== role) {
        res.status(403).json({ message: 'Forbidden' });
        return 
    }
    next();
   } catch (error) {
    console.error(error);
    
   }
};