import { useState, useEffect } from "react";
import DashboardNav from "../DashboardNav/DashboardNav";
import ConnectNav from "../ConnectNav/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DollarCircleOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { sellerHotels, deleteHotel } from "../actions/hotel";
import { toast } from "react-toastify";
import SmallCard from "../components/SmallCard/SmallCard";
import "./index.scss";


const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSellersHotels();
  }, []);

  const loadSellersHotels = async () => {
    let { data } = await sellerHotels(auth.token);
    setHotels(data);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); 
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("[połączenie ze stripe nie powiodło się, spróbuj ponownie.");
      setLoading(false);
    }
  };

  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm("Jesteś pewny, że chcesz usunąć to ogłoszenie?")) return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("ogłoszenie usunięte");
      loadSellersHotels();
    });
  };

  const connected = () => (
    <div className="container-fluid dashboard-main">
      <div className="row">
        <div className="col-md-10">
          <h2>Twoje ogłoszenia</h2>
        </div>
        <div className="col-md-2">
          <Link to="/hotels/new" className="btn btn-primary">
            + dodaj nowe
          </Link>
        </div>
      </div>

      <div className="col m-2">
        {hotels.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewMoreButton={false}
            owner={true}
            handleHotelDelete={handleHotelDelete}
          />
        ))}
      </div>
    </div>
  );

  const notConnected = () => (
    <div className="container-fluid dashboard-main">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <DollarCircleOutlined  className="h1" />
            <h4>Skonfiguruj płatności by móc wystawiać ogłoszenia</h4>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Przetwarzanie..." : "Skonfiguruj"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="items">
        <ConnectNav />
        <DashboardNav />
    </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}

    </>
  );
};

export default DashboardSeller;
