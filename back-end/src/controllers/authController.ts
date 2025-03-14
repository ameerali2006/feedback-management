import { Request, Response } from 'express';
import prisma from '../config/mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {

    try {
        const { name, email, password, role } = req.body;
        if(!name||!email||!password){
            res.status(400).json({ message: 'something is missing' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role: role || 'User' },
        });
        res.status(200).json({ message: 'User registered', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'error on login' });

    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: 'Invalid credentials' });
            return 
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'error on register' });
    }
};

