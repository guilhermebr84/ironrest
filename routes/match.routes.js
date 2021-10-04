const { ObjectId } = require("mongoose").Types;
const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const TeamModel = require("../models/Team.model");
const MatchModel = require("../models/Match.model");
const UserModel = require("../models/User.model");
// const express = require("express");

// const isAdmin = require("../middlewares/isAdmin");

//CRUD
// CREATE
router.post(
  "/match",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await MatchModel.create({
        ...req.body,
        userOwnerId: req.currentUser._id,
      });

      return res.status(201).json(result);
    } catch (err) {
      console.error(err)
      return res.status(500).json({ msg: "Create error" });
    }
  }
);

//READ
router.get(
  "/match",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await MatchModel.find({
        userOwnerId: req.currentUser._id,
      });
      if (!result) {
        return res.status(404).json({ msg: "Match not found" });
      }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ msg: "List error" });
    }
  }
);

// READ by ID
router.get("/match/:id", isAuthenticated, async (req, res, next) => {
  try {
    const result = await MatchModel.findOne({ _id: req.params.id }).populate(
      "usersId"
    );
    if (!result) {
      return res.status(404).json({ msg: "Match not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ msg: "List ID error" });
  }
});

// UPDATE by ID
router.patch("/match/edit/:id", isAuthenticated, async (req, res, next) => {
  try {
    const result = await MatchModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true, runValidators: true }
    );
    if (!result) {
      return res.status(404).json({ msg: "Match not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ msg: "Edit ID error" });
  }
});

// DELETE by ID
router.delete("/match/delete/:id", isAuthenticated, async (req, res, next) => {
  try {
    const result = await MatchModel.deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "Match not found" });
    }
    await UserModel.deleteMany({ userId: ObjectId(req.params.id) });

    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({ msg: "Delete ID error" });
  }
});

module.exports = router;
