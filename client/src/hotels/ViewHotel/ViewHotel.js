import React from 'react'
import { useState, useEffect } from 'react';
import { currencyFormatter } from "../../actions/stripe";
import {read, updateHotel} from '../../actions/hotel';
import {useSelector} from 'react-redux';
import { getSessionId } from '../../actions/stripe';
import {loadStripe} from '@stripe/stripe-js';
import {toast} from 'react-toastify'
import moment from 'moment'
import HotelBookingDate from '../../components/forms/HotelBookingDate'
import dog from "../../assets/dog.jpg"
import cat from "../../assets/cat.jpg"

import "./index.scss"


const ViewHotel = ({match, history}) => {
    const [hotel,setHotel] = useState({});
    const [image, setImage] = useState("");
    const [date, setDate] = useState('')
    const [loading, setloading] = useState(false);

    const [values, setValues] = useState({
        from: "",
        to: "",
      });
    const {from, to} = values;

    const {auth} = useSelector((state) => ({...state}));
    const {token} = auth;

    useEffect(() => {
        loadSellerHotel();
    }, []);

   
    const loadSellerHotel = async () => {
        let res = await read(match.params.hotelId);
        setHotel(res.data);
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    };

    const handleChange = (e) =>{
        setValues({...values, [e.target.name]: e.target.value});
      }

    const handleClick = async (e) => {
        e.preventDefault();
        let hotelData = new FormData()
        hotelData.append('from', from);
        hotelData.append('to', to);
        
        try{
            let res = await updateHotel(token, hotelData, match.params.hotelId)
            console.log('Hotel update', res);
        } catch(err) {
            console.log(err);
        }

        if(!auth || !auth.token) {
            history.push("/login");
            return;
        }

        setloading(true);
        if(!auth) history.push('/login')
        let res = await getSessionId(auth.token, match.params.hotelId)
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY)
        stripe.redirectToCheckout({
            sessionId: res.data.sessionId
        })
        .then((result) => console.log(result));
    };
    const bannerImage = hotel.types === "1" ? dog : cat
    console.log("img", bannerImage)

    return(
        <>
        <div className="hotel-image">
            <img src={bannerImage} alt="header"/>
        <h2>{hotel.title}</h2>
        </div>
        <div className="container-fluid view-hotel">
            <div className="row">
                <div className="col-md-6">
                    <br/>
                    <img src={image} alt={hotel.title} className="img rounded img-fluid m-2 w-100"/>
                </div>
                <div className="col-md-6">
                    <br/>
                    <b>{hotel.description}</b>
                    <p className="alert alert-info mt-3">{hotel.location}</p>
                    <p className="card-text text-danger">
                        {currencyFormatter({
                    amount: hotel.price * 100,
                    currency: "pln",
                  })} za dobę</p>
                <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
                <p className="type">{hotel.types <=1 ? "pies" : "kot"}</p>
                <br/>
                <HotelBookingDate
                    values={values}
                    setValues={setValues}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    />
                <button onClick={handleClick} className='btn btn-block btn-lg btn-primary mt-3 mb-3' disabled={loading}>
                    {loading ? "ładowanie" : auth && auth.token ? 'Zarezerwuj' : "Zaloguj się"}</button>
                </div>
            </div>
        </div>
        </>
    )
};
export default ViewHotel;