// import React from 'react'
import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, toggleAdd, showAdd }) => {
  // const onClick = () => {
  //   console.log("click");
  // };
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color={showAdd ? "red" : "green"} text={showAdd ? "Close" : "Add"} onClick={toggleAdd} />
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
