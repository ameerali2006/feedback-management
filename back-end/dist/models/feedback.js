"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const feedbackSchema = new mongoose_1.default.Schema({
    userId: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true,
        minlength: 10
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});
exports.default = mongoose_1.default.model('Feedback', feedbackSchema);
