const UserService = require('../services/user.service');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.Find();

    res.send({
      data: users,
    });
  } catch (e) {
    next(new Error(e.message));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.FindOne(id);
    if (!user) {
      return res.status(404).send({
        message: 'Cannot find user',
      });
    }

    res.send({
      data: user,
    });
  } catch (e) {
    next(new Error(e.message));
  }
};

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      return res.status(400).send({
        message: 'Please provide your first name and last name.',
      });
    }

    const user = await UserService.Create({ firstName, lastName });

    res.send({
      data: user,
    });
  } catch (e) {
    next(new Error(e.message));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id, firstName, lastName } = req.body;
    if (!id) {
      return res.status(400).send({
        message: 'Please provide a valid user id.',
      });
    }

    const user = await UserService.FindOne(id);
    if (!user) {
      return res.status(404).send({
        message: 'Cannot update when user does not exist.',
      });
    }

    const updatedUserData = await UserService.Update(id, { firstName, lastName });
    res.send({
      data: updatedUserData,
    });
  } catch (e) {
    next(new Error(e.message));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        message: 'Please provide a valid user id.',
      });
    }

    const user = await UserService.FindOne(id);
    if (!user) {
      return res.status(404).send({
        message: 'User does not exist. Cannot delete.',
      });
    }

    await UserService.Delete(id);
    res.send({
      message: 'User has been deleted.',
    });
  } catch (e) {
    next(new Error(e.message));
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
