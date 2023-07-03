const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router
  .get('/users', UserController.getAllUsers)
  .get('/user/:id', UserController.getUserById)
  .post('/user', UserController.createUser)
  .put('/user', UserController.updateUser)
  .delete('/user/:id', UserController.deleteUser);

module.exports = router;
