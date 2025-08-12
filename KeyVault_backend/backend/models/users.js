const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure no duplicate emails
    },
    password: {
        type: String,
        required: true,
    }
});
const usersmodel = mongoose.model('users', Schema);
module.exports = usersmodel;