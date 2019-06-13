const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  checkExistEmail: (req, res, next) => {
    User.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
        res.status(400).json({
          confirmation: "failure",
          message: error
        });
      }
      if (user) {
        //conflict response status code indicates a request conflict with current state of the server
        res.status(409).json({
          confirmation: "failure",
          message: "Email already taken"
        });
      } else {
        next();

        return;
      }
    });
  },
  checkUsername: (req, res, next) => {
    User.findOne({ username: req.body.username }, (error, user) => {
      if (error) {
        res.status(400).json({
          confirmation: "failure",
          message: error
        });
      }
      if (user) {
        //conflict response status code indicates a request conflict with current state of the server
        res.status(409).json({
          confirmation: "failure",
          message: "Username already taken"
        });
      } else {
        next();

        return;
      }
    });
  },
  createUser: (req, res) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        res.status(400).json({
          confirmation: "failure",
          message: error
        });
      }
      console.log(salt);

      bcrypt.hash(req.body.password, salt, (error, hash) => {
        if (error) {
          res.status(400).json({
            confirmation: "failure",
            message: error
          });
        } else {
            
          let newUser = new User({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            passowrd: hash
          });

          newUser.save((error, user) => {
            if (error) {
              res.status(400).json({
                confirmation: "failure",
                message: error
              });
            } else {
              res.json({
                confimation: "success",
                payload: user
              });
            }
          });
        }
      });
    });
  }
};
