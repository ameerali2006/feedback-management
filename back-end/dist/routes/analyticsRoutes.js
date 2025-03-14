"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.get('/analytics', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('Admin'), analyticsController_1.getAnalytics);
exports.default = router;
