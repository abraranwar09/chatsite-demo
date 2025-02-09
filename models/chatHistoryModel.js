const mongoose = require('mongoose');
const messageSchema = require('./messageModel');

const chatHistorySchema = new mongoose.Schema({
    session_id: { type: String, required: true, unique: true },
    name: { type: String },
    messages: [messageSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);

module.exports = ChatHistory; 