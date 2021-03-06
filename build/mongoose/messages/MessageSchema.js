"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for messages between users
 */
const mongoose_1 = __importStar(require("mongoose"));
/**
 * @typedef Message Represents a message sent from one user to another
 * @property {ObjectId} toUser represents the user receiving the message
 * @proprety {ObjectId} fromUser represents the user sending the message
 * @property {string} message represents the actual content of the message
 * @property {Date} sentOn represents the date the message was sent
 */
const MessageSchema = new mongoose_1.default.Schema({
    toUser: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    fromUser: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    sentOn: { type: Date, default: Date.now() }
});
exports.default = MessageSchema;
