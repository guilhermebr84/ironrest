const { Schema, model, Types } = require("mongoose");

const TeamSchema = new Schema({
  name: { type: String, required: true, trim: true },
  city: {
    type: String,
    required: true,
    enum: [
      "São Paulo/SP, Rio de Janeiro/RJ",
      "Porto Alegre/RS",
      "Florianópolis/SC",
      "Vitória/ES",
      "Salvador/BA",
      "outros",
    ],
  },
  players: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  capitain: { type: String },
});

const TeamModel = model("Team", UserSchema);

module.exports = TeamModel;
