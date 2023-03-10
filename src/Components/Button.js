import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color, width: "80px" }}
      className="btn"
    >
      {text}
    </button>
  );
};

Button.defaultProps = { color: "green", text: "Add" };

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
