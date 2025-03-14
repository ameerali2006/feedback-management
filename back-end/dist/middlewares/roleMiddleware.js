"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (role) => (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    if (req.user.role !== role) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    next();
};
exports.roleMiddleware = roleMiddleware;
