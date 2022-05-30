const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const placesController = require('../controllers/places-controller');
const fileUpload = require('../middleware/file-upload');

router.get('/:pid', placesController.getPlaceById);

router.get('/user/:uid', placesController.getPlacesByUserId);

router.use(checkAuth);

router.post(
    '/',
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty(),
    ],
    placesController.createPlace
);

router.patch(
    '/:pid',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 })
    ],
    placesController.updatePlace
);

router.delete('/:pid', placesController.deletePlace);

module.exports = router;