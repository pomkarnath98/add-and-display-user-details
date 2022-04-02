const bcrypt = require("bcryptjs");
const fsExtra = require('fs-extra');
const User = require("../models/User");

const { registerValidation } = require("../validation");

const Register = async (req, res) => {
  const image = req.files.image[0];
  const payload = { ...JSON.parse(req.body.data), image };

  const { error } = registerValidation(payload);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const emailExists = await User.findOne({ email: payload.email });
  if (emailExists) {
    return res.status(400).send("Email already exists in the database");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    await bcrypt.genSalt(10)
  );
  const user = new User({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    image: payload.image
  });

  try {
    await user.save();
    fsExtra.emptyDirSync('upload'); //Clear Directory Content
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send(err);
  }
};

const fetchUser = async (req, res) => {
  const result = await User.find({})
    .then((trans) => (reqdata = trans))
    .catch((err) => res.status(400).json("Error: " + err));
  res.json(result);
}

const fetchSingleUser = async (req, res) => {
  const { email_id } = req.params;
  const result = await User.find({ email: email_id })
    .then((trans) => (reqdata = trans))
    .catch((err) => res.status(400).json("Error: " + err));
  res.json(result);
}

const editUser = async (req, res) => {
  const { email_id } = req.params;
  await User.find({ email: email_id })
    .then((user) => {
      user[0].name = req.body.name;
      user[0].email = email_id;
      user[0]
        .save()
        .then(() => res.json("User updated Successfully"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
}

const deleteUser = async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted Successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
  res.json(result);
}

module.exports = { Register, fetchUser, fetchSingleUser, editUser, deleteUser };