import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  // const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));

  const handleLogout = async () => {
    await localStorage.removeItem("auth");
    window.location.href = "/login";
  };
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light  bg-dark">
          <NavLink className="navbar-brand ms-3 text-light" to="/">
            OXOYO
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              {!auth ? (
                <>
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <div className="dropdown mt-2 ml-2">
                    <NavLink
                      className=" dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">
                      <i className="fa-solid fa-user p-2"></i>
                      {auth?.user?.name}
                    </NavLink>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink">
                      <Link className="dropdown-item" to="profile">
                        Profile
                      </Link>
                      <hr />
                      <Link className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
// <li className="nav-item dropdown">
//   <NavLink
//     className="nav-link dropdown-toggle"
//     role="button"
//     data-bs-toggle="dropdown"
//     aria-expanded="false">
//     {auth?.user?.name}
//   </NavLink>
//   <ul className="dropdown-menu">
//     <li>
//       <NavLink
//         onClick={handleLogout}
//         to="/login"
//         className="dropdown-item">
//         Logout
//       </NavLink>
//     </li>
//   </ul>
// </li>;
