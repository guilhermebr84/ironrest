const router = require("express").Router();
const TeamModel = require("../models/Team.model");

const bcrypt = require("bcryptjs");

const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const {ObjectId} = require('mongoose').Schema.Types

//CRUD
// CREATE
router.post("/team", async (req, res) => {
  console.log(req.body);
  try {
    TeamModel.create(...req.body);
    return res.status(201).json(result);
  } catch (err) {
    console.error;
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// READ - Lista

router.get(
  "/team",
  async(req, (res) => {
    try {
      TeamModel.find();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ msg: " " });
    }
  })
);

// READ - Detalhes
router.get("/team/:id", (req, res) => {
  try {
    if (!result) {
      return res.status(404).json({ msg: "not found, try again." });
    }
    TeamModel.findOne({ _id: req.params.id });
    return res.status(200).json(result);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "fail to find teams, server internal error."});
  }
});

// UPDATE

router.patch("/team/id", (req, res, next) => {
  try {
    const result = await TeamModel.findOneAndUpdate(
      { _id: Object(req.params.id) },
      { $set: { ...req.body } },
      { new: true },
      { runValidators: true }
    );

    if(!result){
      return res.status(404).json({ msg: "not found, try again."})
    }
    return res.status(200).json(result)
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "fail to update team, server internal error."});
  }
});

//DELETE
router.delete('/team/:id', (req, res) => {
  TeamModel.deleteOne({_id: Object(req.params.id)});
  try {
    if (result.deletedCount < 1 ) {
      return res.status(404).json({ msg: "not found, try again." });
    }  
  return res.status(200).json({}); 
} catch (err) {
  return res
  .status(500)
  .json({ msg: "fail to update team, server internal error."});
}
})

module.exports = router;
