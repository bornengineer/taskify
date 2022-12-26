// import React from 'react'
import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation, Link } from "react-router-dom";

const Header = ({ title, toggleAdd, showAdd }) => {
  // const onClick = () => {
  //   console.log("click");
  // };

  const location = useLocation();

  return (
    <header className="header">
      <img
        style={{ height: "35px", marginRight: "-140px", marginBottom: "5px" }}
        alt="logo"
        src="taskify_logo.png"
      ></img>
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={toggleAdd}
        />
      )}
      {location.pathname === "/instructions" && (
        <Link
          style={{
            textDecoration: "underline",
            color: "#5f5f60",
            cursor: "pointer",
            padding: "5px 10px",
          }}
          to="/"
        >
          Go Back
        </Link>
      )}
    </header>
  );
};

// CSS in JS
// const HeaderStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

Header.defaultProps = {
  title: "Taskify",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
