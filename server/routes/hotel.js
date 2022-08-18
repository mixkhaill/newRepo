import express from "express";
import formidable from 'express-formidable'

const router = express.Router();

import { create, hotels, image, sellerHotels, remove, read, update, userHotelBookings, isAlreadyBooked, searchListings, searchListingsLocation, searchListingsTypes} from "../controllers/hotel";

import { requireSignin, hotelOwner } from "../middlewares";

router.post("/create-hotel",requireSignin, formidable(), create);
router.get('/hotels', hotels);
router.get('/hotel/image/:hotelId', image);
router.get('/seller-hotels', requireSignin, sellerHotels)
router.delete('/delete-hotel/:hotelId', requireSignin, hotelOwner, remove)
router.get('/hotel/:hotelId', read)
router.put('/update-hotel/:hotelId', requireSignin, hotelOwner, formidable(), update)
router.get('/user-hotel-bookings', requireSignin, userHotelBookings)
router.get('/is-already-booked/:hotelId', requireSignin, isAlreadyBooked)
router.post('/search-listings', searchListings)
router.post('/search-listings-location', searchListingsLocation)
router.post('/search-listings-types', searchListingsTypes)



module.exports = router;
