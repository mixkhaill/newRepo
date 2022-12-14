import DashboardNav from "../DashboardNav/DashboardNav";
import ConnectNav from "../ConnectNav/ConnectNav";
import { Link } from "react-router-dom";
import { userHotelBookings } from "../actions/hotel";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import BookingCard from "../components/BookingCard/BookingCard";
import "./index.scss";



const Dashboard = () => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    const res = await userHotelBookings(token);
    console.log(res);
    setBooking(res.data);
  };

  return (
    <>
    <div className="items">
        <ConnectNav />
        <DashboardNav />
    </div>

      <div className="dashboard container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Twoje zamówienia</h2>
          </div>
          <div className="col-md-2">
            <Link to="/" className="btn btn-primary">
              Strona główna
            </Link>
          </div>
        </div>
      </div>

      <div className="col m-3 prev-orders">
        {booking.map((b) => (
          <BookingCard
            key={b._id}
            hotel={b.hotel}
            session={b.session}
            orderedBy={b.orderedBy}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
