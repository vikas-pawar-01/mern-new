const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const mongoose = require('mongoose');
const Place = require('../models/place');
const User = require('../models/user');
const fs = require('fs');

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a place.',
            500
        );

        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find a place for provided id.', 404);
        return next(error);
    }

    res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let userWithPlaces;
    try {
        // places = await Place.find({ creator: userId });
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a place for provided user id.',
            500
        );

        return next(error);
    }

    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(new HttpError('Could not find a place for provided user id.', 404));
    }

    res.json({ places: userWithPlaces.places.map(p => p.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid input passed, please check input data.', 422));
    }

    const { title, description, address } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        image: req.file.path,
        location: coordinates,
        address,
        creator: req.userData.userId
    });

    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            'Could not find user for provided id',
            404
        );
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid input passed, please check input data.', 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let updatedPlace;

    try {
        updatedPlace = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update the place.',
            500
        );
        return next(error);
    }

    if (updatedPlace.creator.toString() !== req.userData.userId) {
        const error = new HttpError(
            'You are not allowed to edit this place.',
            401
        );
        return next(error);
    }

    updatedPlace.title = title;
    updatedPlace.description = description;

    try {
        await updatedPlace.save();
    } catch (err) {
        const error = new HttpError(
            'Updating place failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let deletedPlace;
    try {
        deletedPlace = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete the place.22',
            500
        );
        return next(error);
    }

    if (!deletedPlace) {
        const error = new HttpError(
            'Could find the place for provided id.',
            404
        );
        return next(error);
    }

    if (deletedPlace.creator.id !== req.userData.userId) {
        const error = new HttpError(
            'You are not allowed to delete this place.',
            401
        );
        return next(error);
    }

    const filePath = deletedPlace.image;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await deletedPlace.remove({ session: sess });
        deletedPlace.creator.places.pull(deletedPlace);
        await deletedPlace.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete the place.111',
            500
        );
        return next(error);
    }

    fs.unlink(filePath, err => {
        console.log(err);
    });

    res.status(200).json({ message: 'Deleted successfully.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;