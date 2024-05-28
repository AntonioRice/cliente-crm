import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, value, description, bgColor }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg ${bgColor}`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-4xl font-bold mt-4">{value}</p>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string,
  bgColor: PropTypes.string,
};

Card.defaultProps = {
  description: "",
  bgColor: "bg-gray-200",
};

export default Card;
