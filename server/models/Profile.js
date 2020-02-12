const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    sex: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now()
    },
    update_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Profile = mongoose.model('profile', profileSchema);