const router = require("express").Router();
const MatchModel = require("../models/Match.model");

const bcrypt = require("bcryptjs");

const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");