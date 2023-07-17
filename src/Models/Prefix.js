const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
    Guild: String,
    Prefix: String,
});

module.exports = mongoose.model('Prefix', prefixSchema);
