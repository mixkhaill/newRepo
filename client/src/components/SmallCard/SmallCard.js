import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/hotel";
import { useHistory, Link } from "react-router-dom";
import "./index.scss";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  h,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="card mb-4 small-card">
        <div className="row no-gutters">
          <div className="col-md-4 img-col">
            {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
                alt="default hotel image"
                onClick={() => history.push(`/hotel/${h._id}`)}
                className="card-image img rounded img-fluid image"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col">
            <div className="card-body main-items">
              <h3 
              onClick={() => history.push(`/hotel/${h._id}`)}
              className="card-title">
                {h.title}{" "}
                <span className="currency">
                  {currencyFormatter({
                    amount: h.price * 100,
                    currency: "pln",
                  })}
                </span>
              </h3>
              <p className="location">{h.location}</p>
              <p className="card-text">{`${h.description.substring(0, 200)}...`}</p>
              <p className="type">{h.types <=1 ? "pies" : "kot"}</p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/hotel/${h._id}`)}
                    className="btn"
                  >
                    Zobacz więcej
                  </button>
                )}
                {owner && (
                  <>
                    <Link to={`/hotel/edit/${h._id}`}>
                      <EditOutlined className="text-warning edit" />
                    </Link>
                    <DeleteOutlined
                      onClick={() => handleHotelDelete(h._id)}
                      className="text-danger delete"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
