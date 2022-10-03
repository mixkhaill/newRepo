import { useState, useEffect } from "react";
import DashboardNav from "../DashboardNav/DashboardNav";
import ConnectNav from "../ConnectNav/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DollarCircleOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { sellerHotels, deleteHotel } from "../actions/hotel";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddKeeper from "../components/addKeeper/AddKeeper";
import KeeperModal from "../components/KeeperModal/KeeperModal";
import "./index.scss";


const DashboardKeeper = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const tab = ['Krzysztof', 'Anna', 'Bartosz', 'Dawid', 'Aleksandra'];

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
          <h2>Twoi opiekunowie</h2>
        </div>
        <div className="col-md-2">
          {/* <Link to="/hotels/new" className="btn btn-primary">
            + dodaj nowe
          </Link> */}
          <button className="btn btn-primary"  onClick={() => setShowModal(!showModal)}>
            + dodaj opiekuna
          </button>
        </div>
            {showModal && (
                <AddKeeper
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}
      </div>

      <div className="col m-2 keepers">
        {tab.map((item, i) => {
          return(
          <div className="d-flex justify-content-between w-100">
            <h1 onClick={() => setShowModal2(!showModal2)}>{item}</h1>
            <DeleteOutlined
              className="text-danger delete"
            />
            </div>
          )
        })}
      </div>
      {showModal2 && (
        <KeeperModal
          showModal2={showModal2}
          setShowModal2={setShowModal2}
        />
      )}
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

export default DashboardKeeper;
