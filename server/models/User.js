const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    creation_date: {
        type: Date,
        default: Date.now()
    },
    update_date: {
        type: Date,
        default: Date.now()
    },
    email_confirmed: {
        type: Boolean,
        default: false
    },
    is_admin: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('user', UserSchema);