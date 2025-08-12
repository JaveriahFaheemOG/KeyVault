const mongoose = require('mongoose');

// Note schema
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true }); // This will add `createdAt` and `updatedAt` fields

// Note model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
