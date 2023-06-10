const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  const {username,password} = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username: username,
      password: hashedPass,
    });
    
    const user = await newUser.save();

    const userx = await User.findById(user._id);

    if(userx){
      res.status(200).json({
        data: userx,
        message:"Registery Successfull!"
      });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;

    res.status(200).json({
       data: others,
       message : `Hoşgeldin ${others.username}`
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;