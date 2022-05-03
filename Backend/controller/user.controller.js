const UserModel = require("../model/user.model");
const encrypt = require("bcrypt");
const { tokenGenerator } = require("../auth/token");
const userController = {
  register: async (req, res) => {
    const { username, email, phonenumber, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const userPhone = await UserModel.findOne({ phone: phonenumber });
    if (userPhone) {
      return res.status(400).json({ msg: "Phonenumber already in use" });
    }
    UserModel.find().distinct(phonenumber, function (error, ids) {
      console.log(ids);
    });
    console.log("demo");
    const hashPass = await encrypt.hash(password, 12);
    const model = new UserModel({
      name: username,
      email: email,
      phone: phonenumber,
      password: hashPass,
    });
    model
      .save()
      .then((result) => res.json({ msg: "Register successfully" }))
      .catch((err) => res.send(err));
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      const match = await encrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({ msg: "Password not Match" });
      } else {
        res.json({ msg: "Logged success", data: user });
      }
    } catch (error) {
      console.log("error");
    }
  },

  profile: async (req, res) => {},
};

module.exports = userController;
