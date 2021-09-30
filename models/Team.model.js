const { Schema, model, Types } = require("mongoose");

const TeamSchema = new Schema({
    name: { type: String, required: true, trim: true },
    city: {
      type: String,
      required: true
    },
    position: {
      type: String,
      enum: ["ATTACK", "MIDFIELDER", "DEFENSE", "GOALKEEPER"],
      required: true,
    },
    players: [{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }]
  });
  
  const TeamModel = model("Team", UserSchema);

module.exports = TeamModel;

