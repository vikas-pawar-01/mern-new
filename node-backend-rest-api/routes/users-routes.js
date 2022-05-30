const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const usersController = require('../controllers/users-controller.js');
const fileUpload = require('../middleware/file-upload.js');

router.get('/', usersController.getUsers);

router.post('/login', usersController.loginUser);

router.post(
    '/signup',
    fileUpload.single('image'),
    [
        check('name').notEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 })
    ],
    usersController.signupUser
);

module.exports = router;