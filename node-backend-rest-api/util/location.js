const axios = require('axios');
const HttpError = require('../models/http-error');

async function getCoordsForAddress(address) {

    return {
        lat: 40.7484405,
        lng: -73.9856644
    };

    // const response = await axios.get(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //         address
    //     )}&key=${API_KEY}`
    // );

    // const data = response.data;

    // console.log(data);

    // if(!data || data.status === 'ZERO_RESULTS' ) {
    //     const error = new HttpError('Could not found location for the specified address', 422);
    //     throw error;
    // }

    // let coordinates = {
    //     lat: 40.7484405,
    //     lng: -73.9856644
    // };
    // if(data.results[0]) {
    //     coordinates = data.results[0].geometry.location;
    // }

    // return coordinates;
}

module.exports = getCoordsForAddress;