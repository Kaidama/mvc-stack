var express = require('express');
var router = express.Router();

let userController = require('../controllers/userController')
let User = require('../models/User')
let signupController = require('../controllers/signupController')
/* GET users listing. */
router.get('/', (req, res, next) => {
  // res.send('respond with a resource');
  userController.findAllUsers({}, (error, users) => {
    //nothing is specified when find all
    if (error) {
      res.status(400).json({
        confirmation: 'failure',
        message: error
      })
    } else {
      res.json({
        confirmation: 'success',
        data: users
      })
    }
  })
  // res.send('HEY FROM USER ROUTE')
});

router.put('/updateuserbyid/:id', (req, res) => {
  // console.log(req.params)
  // res.send(req.params)
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedUser) => {
    if (error) {
      res.status(400).json({
        confirmation: 'failure',
        message: error
      })
    } else {
      res.json({
        confirmation: 'success',
        payload: updatedUser
      })
    }
  })})

router.delete('/deleteuserbyid/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (error, deletedUser)=> {
    if (error) {
      res.status(400).json({
        confirmation: 'failure',
        message: error
      })
    } else {
      res.json({
        confirmation: 'success',
        payload: deletedUser
      })
  }
})})








// Add these checks to createuser route
router.post('/createuser', signupController.checkExistEmail, signupController.checkUsername, signupController.createUser)
//test bcrypt
// router.get('/test', (req, res) => {
//   if (error) {
//     res.status(400).json({
//         confirmation: 'failure',
//         message: 'error'
//     })
//   }
// })



module.exports = router
