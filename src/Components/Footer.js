import React from "react";
import { useLocation, Link } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      {location.pathname === "/" && (
        <Link
          style={{
            textDecoration: "underline",
            color: "#5f5f60",
            cursor: "pointer",
            padding: "5px 10px",
          }}
          to="/instructions"
        >
          Instructions & Features
        </Link>
      )}
      <p style={{ color: "#95959e", fontSize: "14px" }}>
        Copyright &copy; 2023 MAK-TECH
      </p>
    </div>
  );
};

export default Footer;
