const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { user } = req.locals;
    const newUser = new User(req.body);
    console.log('req.body', req.body, 'user', user, 'newUser', newUser);
    // const ommitRole = user.role !== 'admin' ? 'role' : '';
    // const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

    await user.updateOne(newUser.toObject(), { override: true, upsert: false });
    const savedUser = await User.findById(user._id);

    res.json(savedUser);
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    console.log(req.body, 'req.body');
    // const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
    const oldUser = await User.get(req.query.userId);
    // const { user, accessToken } = await User.findAndGenerateToken(oldUser);

    const user = Object.assign(oldUser, req.body, {
      override: true,
    });

    console.log('user', user);

    // console.log('oldUser', oldUser);
    // // console.log('oldUser', oldUser);
    // res.json('test');
    const updatedUser = await user.save();
    res.status(200);
    res.json(updatedUser.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map(user => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const { user } = req.locals;

  user
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
