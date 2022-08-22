import { useState } from "react";
import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/hotel";
import { useHistory, Link } from "react-router-dom";
import OrderModal from "../modals/OrderModal";

const BookingCard = ({ hotel, session, orderedBy }) => {
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {hotel.image && hotel.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {hotel.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: hotel.price * 100,
                    currency: "pln",
                  })}
                </span>{" "}
              </h3>
              <p className="alert alert-info">{hotel.location}</p>
              <p className="card-text">{`${hotel.description.substring(
                0,
                200
              )}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  na {diffDays(hotel.from, hotel.to)}{" "}
                  {diffDays(hotel.from, hotel.to) <= 1 ? " dzień" : " dni"}
                </span>
              </p>
              <p className="card-text">{hotel.types <= 1 ? "pies" : "kot"} </p>
              <p className="card-text">
                od {new Date(hotel.from).toLocaleDateString()}
              </p>
              <p className="card-text">
                do {new Date(hotel.to).toLocaleDateString()}
              </p>

              {showModal && (
                <OrderModal
                  session={session}
                  orderedBy={orderedBy}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}

              <div className="d-flex justify-content-between h4">
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="btn btn-primary"
                >
                  Show Payment info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;