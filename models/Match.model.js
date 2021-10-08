const { Schema, model, Types } = require("mongoose");

const MatchSchema = new Schema({
  city: {
    type: String,
    required: true,
    enum: [
      "São Paulo/SP",
      "Rio de Janeiro/RJ",
      "Porto Alegre/RS",
      "Florianópolis/SC",
      "Vitória/ES",
      "Salvador/BA",
      "outros",
    ],
  },
  addressMatch: { type: String },
  date: { type: Date, default: Date.now() },
  hour: { type: String },
  teams: [{ type: Types.ObjectId, ref: "Teams" }],
  pitchType: {
    type: String,
    enum: ["INDOOR 5x5", "OUTDOOR 7x7", "PROFESSIONAL 11x11"],
  },
  comments: { type: String, maxlength: 255 },
  userOwnerId: {type: Types.ObjectId, ref: "User"},
});

const MatchModel = model("Match", MatchSchema);

module.exports = MatchModel;
