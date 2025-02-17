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
  "/team",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await TeamModel.create({
        ...req.body,
        userOwnerId: req.currentUser._id,
      });

      return res.status(201).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Create error" });
    }
  }
);

// userOwnerId: req.currentUser._id
//READ 1
router.get(
  "/team",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await TeamModel.find({userOwnerId: req.currentUser._id});
      if (!result) {
        return res.status(404).json({ msg: "Team not found" });
      }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ msg: "List error" });
    }
  }
);

//READ all
router.get(
  "/team/all",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await TeamModel.find();
      if (!result) {
        return res.status(404).json({ msg: "Team not found" });
      }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ msg: "List error" });
    }
  }
);

// READ by ID
router.get("/team/:id", isAuthenticated, async (req, res, next) => {
  try {
    const result = await TeamModel.findOne({ _id: req.params.id }).populate(
      "usersId"
    );
    if (!result) {
      return res.status(404).json({ msg: "Team not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ msg: "List ID error" });
  }
});

// pesquisar por nome

// UPDATE by ID
router.patch("/team/edit/:id", isAuthenticated, async (req, res, next) => {
  try {
    const result = await TeamModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true, runValidators: true }
    );
    if (!result) {
      return res.status(404).json({ msg: "Team not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ msg: "Edit ID error" });
  }
});

//DELETE by ID
router.delete("/team/delete/:id", isAuthenticated, async (req, res, next) => {
  try {
    const result = await TeamModel.deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "Team not found" });
    }
    await UserModel.deleteMany({ userId: ObjectId(req.params.id) });

    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({ msg: "Delete ID error" });
  }
});

module.exports = router;
