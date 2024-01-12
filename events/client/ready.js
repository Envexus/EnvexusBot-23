const mongoose = require(`mongoose`);
const mongoURL = process.env.mongoURL;

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

      if(!mongoURL) return;
      mongoose.set('strictQuery', true);
      await mongoose.connect(mongoURL || '', {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
      })


      if(mongoose.connect) {
        console.log("Database Connected!")
      }

      console.log(`${client.user.tag} is now Online!`);
    },
  };