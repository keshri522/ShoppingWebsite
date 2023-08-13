const User = require("../model/userSchema");
const Auth = async (req, res) => {
  try {
    // destructing the name email and picture from thereq.user..
    const { name, email, picture, role } = req.user;
    // now check if the user is already present in the mongo db or not if present then update the name and pic .
    const user = await User.findOneAndUpdate(
      { email: email },
      { name: email.slice(0, 10), picture: picture },
      { role: role },
      { new: true }
    );
    // new:true mean it will always return the updated data..
    if (user) {
      // console.log("User Updated", user);
      res.status(200).json(user);
    } else {
      // need to create the with the name email and picture..
      let user = await new User({
        email: email,
        name: email.slice(0, 10),
        picture: picture,
        role: role,
      });
      // need to save..
      user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};
// this will return all the detals of the users when ever user refresh the pages.
const CurrentUser = async (req, res) => {
  // checking if email is present or not coming from req.user.email from middleware auth middleware
  try {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      res.status(200).json(user);
    } else {
      console.log("user not found");
      res.status(404).json("user not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
module.exports = { Auth, CurrentUser };
