const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    folder: {
        type: String,
        required: true,
        enum: [
            'Instagram',
            'Facebook',
            'Gmail',
            'LinkedIn',
            'Twitter',
            'Amazon',
            'Reddit',
            'Netflix',
            'PayPal',
            'Dropbox',
            'Youtube',
            'Github',
            'Spotify',
            'Snapchat',
        ],
    },
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    username: {
        type: String,
        required: true,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Password', passwordSchema);
