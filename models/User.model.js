const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  age: { type: Number, min: 16, max: 80, required: true },
  userTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teams" }]
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;

// userComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],

