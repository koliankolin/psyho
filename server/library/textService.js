module.exports.cleanPhone = (phone) => {
    return phone.replace(/\D/g,'').toString();
};