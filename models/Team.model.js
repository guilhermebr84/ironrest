const { Schema, model, Types } = require("mongoose");

const TeamSchema = new Schema({
  name: { type: String, required: true, trim: true },
  city: {
    type: String,
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
  userOwnerId: { type: Types.ObjectId, ref: "User" },
  players: [{ type: Types.ObjectId, ref: "User" }],
  capitain: { type: String },
});

const TeamModel = model("Team", TeamSchema);

module.exports = TeamModel;
