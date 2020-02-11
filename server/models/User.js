const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
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
    creation_date: {
        type: Date,
        default: Date.now()
    },
    update_date: {
        type: Date,
        default: Date.now()
    },
    is_admin: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('user', UserSchema);