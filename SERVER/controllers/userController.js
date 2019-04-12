/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import users from '../dummyData/user';

/**
 * @exports
 * @class UserController
 */

class UserController {
  static registerUser(req, res) {
    let user = users.find(check => check.email === req.body.email);
    if (user) {
      return res.status(400).json({
        status: 400,
        error: 'Email already registered',
      });
    }

    user = {
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      type: req.body.type,
      password: bcrypt.hashSync(req.body.password),
    };
    users.push(user);

    const payload = {
      email: user.email,
      type: user.type,
    };

    const token = jwt.sign(payload, 'privatekey', {
      expiresIn: '24h',
    });

    res.header('Authorization', token).status(201);
    res.json({
      status: 201,
      message: 'Registered successfully',
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    });
  }

  static loginUser(req, res) {
    const user = users.find(check => check.email === req.body.email);
    if (!user) {
      return res.status(400).json({
        status: 400,
        error: 'Incorrect email',
      });
    }

    const check = bcrypt.compareSync(req.body.password, user.password);
    if (!check) {
      return res.status(400).json({
        status: 400,
        error: 'Incorrect password',
      });
    }

    // Generate token
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const token = jwt.sign(payload, 'privatekey', {
      expiresIn: '24h',
    });
    res.json({
      status: 200,
      message: 'Logged in successfully',
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }
}

export default UserController;
