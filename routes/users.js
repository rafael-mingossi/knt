const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

//get the list of users from local API
router.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

//create a new user in local API
router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    //passwordHash: bcrypt.hashSync(req.body.password, 10),
  });
  user = await user.save();

  if (!user) {
    return res.status(400).send("The user cannot be created");
  } else {
    res.send(user);
  }
});

module.exports = router;
