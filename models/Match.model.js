const { Schema, model, Types } = require("mongoose");

const MatchSchema = new Schema({
  city: { type: String, required: true, enum: ["São Paulo/SP, Rio de Janeiro/RJ", "Porto Alegre/RS", "Florianópolis/SC", "Vitória/ES", "Salvador/BA", "outros"]},
  addressMatch: {type: String, required: true},
  date: { type: Date, default: Date.now(), required: true },
  hour: { type: String, required: true },
  teams: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Teams", required: true },
  ],
  pitchType: {
    type: String,
    enum: ["INDOOR 5x5", "OUTDOOR 7x7", "PROFESSIONAL 11x11"],
    required: true,
  },
  comments: { type: String, required: true, maxlength: 255 },
});

const MatchModel = model("Match", UserSchema);

module.exports = MatchModel;
