import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";





const TopNav = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const [navbarOpen, setNavbarOpen] = useState(false)
  const history = useHistory();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };

  const handleChange = () => {
    setNavbarOpen(!navbarOpen);
  }
  
  return (
    <div className={`main ${navbarOpen ? "open" : ""}`}>
        <FontAwesomeIcon icon={faBars} onClick={handleChange} className="burger"/>
        <FontAwesomeIcon icon={faXmark} onClick={handleChange} className="xmark"/>
    <div className={`nav headerNav ${navbarOpen ? "open" : ""} container`}>
      <Link className="nav-link" to="/">
        Strona główna
      </Link>

      {auth !== null && (
        <Link className="nav-link" to="/dashboard">
          Panel Użytkownika
        </Link>
      )}

      {auth !== null && (
        <a className="nav-link pointer" href="#" onClick={logout}>
          Wyloguj się
        </a>
      )}

      {auth === null && (
        <>
          <Link className="nav-link" to="/login">
            Zaloguj się
          </Link>
          <Link className="nav-link" to="/register">
            Zarejestruj się
          </Link>
        </>
      )}
    </div>
  </div>
  );
};

export default TopNav;
