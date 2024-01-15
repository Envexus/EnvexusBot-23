const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  discordId: String,
  roles: [String],
});

const membersc = mongoose.model('member', memberSchema);

module.exports = membersc;