import { Link } from "react-router-dom";
import "./index.scss";

const DashboardNav = () => {
  const active = window.location.pathname;
  return (
    <ul className="dashboard-nav">
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/dashboard" && "active"}`}
          to="/dashboard">
          Twoje zamówienia
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/dashboard/seller" && "active"}`}
          to="/dashboard/seller">
          Twoje ogłoszenia
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/dashboard/keepers" && "active"}`}
          to="/dashboard/keepers">
          Twoi opiekunowie
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
