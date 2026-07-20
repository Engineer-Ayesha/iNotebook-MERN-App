import React from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar(props) {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  let location = useLocation();
  useEffect(() => {
  }, [location]);
  return (
    <div>
      <nav
         className={`navbar navbar-expand-lg ${
    props.bgcolor === "black" ? "navbar-dark" : "navbar-light"
  }`}
        style={{
          backgroundColor: props.bgcolor === "white" ? "#F8F9FA" : "#1f1f1f",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                  aria-current="page"
                  to="/" 
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center mt-3 mt-lg-0 mb-4 mb-lg-0">
              <i
                className="fa-solid fa-moon me-3"
                style={{ fontSize: "20px", color: props.bgcolor === "white" ? "#6C757D" : "#E9ECEF" }}
              ></i>
              <div className="form-check form-switch mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="themeSwitch"
                  onChange={props.toggle}
                />
              </div>
            </div>

            {!localStorage.getItem("authToken") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
