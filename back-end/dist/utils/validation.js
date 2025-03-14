"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFeedback = exports.feedbackSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum(['User', 'Admin']).optional(),
});
exports.feedbackSchema = zod_1.z.object({
    message: zod_1.z.string().min(10, 'Feedback must be at least 10 characters'),
});
const validateFeedback = (req, res, next) => {
    exports.feedbackSchema.parse(req.body);
    next();
};
exports.validateFeedback = validateFeedback;
