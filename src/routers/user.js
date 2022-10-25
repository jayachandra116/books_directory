const User = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const { ObjectId } = require("mongodb");
const router = new express.Router();
const auth = require("../middlewares/auth");

const isReqIdValid = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    }
    return false;
  }
  return false;
};

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    if (!isReqIdValid(req.params.id)) {
      return res
        .status(400)
        .send({ message: "Provided 'id' value is invalid" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).send()
    }
    let responseObject = {
      email: user.email,
      profileName: user.profileName,
      lastUpdated: user.updatedAt,
    };
    res.status(200).send(user ? responseObject : null);
  } catch (e) {
    console.error(e);
    res.status(404).send();
  }
});

//add new user
router.post("/users", async (req, res) => {
  try {
    const user = req.body.user;
    const dbUserObject = new User(user);
    await dbUserObject.save();
    const token = await dbUserObject.generateAuthToken();
    res.status(200).send({ message:"User succesfully created",user: dbUserObject, token: token });
  } catch (e) {
    res.status(404).send(e);
  }
});

//login user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(404).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(404).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["email", "password", "profileName"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);

    res.status(400).send(e);
  } catch (e) {
    res.status(404).send();
  }
});

//update user
router.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(400).send();
    }
    const updatedUserFromDb = await User.findById(req.params.id);
    if (!updatedUserFromDb) {
      return res.status(400).send();
    }
    res.send(updatedUserFromDb);
  } catch (e) {
    res.status(404).send();
  }
});


router.delete('/users',async (req,res)=>{
  try {
    await User.deleteMany();
    res.send()
  } catch (e) {
    res.status(404).send()
  }
})

router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: "User sucessfully deleted" });
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
