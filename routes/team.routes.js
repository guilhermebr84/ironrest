const router = require("express").Router();
const TeamModel = require("../models/Team.model");

const bcrypt = require("bcryptjs");

const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

//CRUD
// CREATE
router.post("/team", async (req, res) => {
  console.log(req.body);
  try {
    return res.status(201).json(result);
  } catch (err) {
    console.error;
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// UPDATE
