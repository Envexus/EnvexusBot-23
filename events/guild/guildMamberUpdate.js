const mongoose = require('mongoose');
const Member = require('../../schemas/user');

module.exports = {
  name: 'guildMemberUpdate',
  once: false,
  async execute(oldMember, newMember) {
    const addedRoles = newMember.roles.cache.filter((role) => !oldMember.roles.cache.has(role.id));

    if (addedRoles.size > 0) {
      const memberId = newMember.id;

      // Check if the schema exists, if not, create it
      if (!mongoose.connection.collections.members) {
        // Define a schema for your data
        const memberSchema = new mongoose.Schema({
          discordId: String,
          roles: [String],
        });

        // Create a model based on the schema
        mongoose.model('member', memberSchema);
      }

      let member = await Member.findOne({ discordId: memberId });

      if (!member) {
        member = new Member({
          discordId: memberId,
          roles: [],
        });
      }

      addedRoles.forEach((role) => {
        member.roles.push(role.id);
      });

      await member.save();
    }
  },
};
