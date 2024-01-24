const { model, Schema } = require('mongoose');

let profile = new Schema({
    UserID: String,
    Bio: String,
    TicketsHandled: Number,
    PunishmentsGiven: Number,
    YearsOfService: Number,
    Rank: [String],
    Rating: String
})

module.exports = model("profile", profile)