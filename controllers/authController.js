import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import

export const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const user = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });
    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const isValidPass = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: "wrong email or password",
      });
    }
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }
};
