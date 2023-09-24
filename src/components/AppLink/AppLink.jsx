import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { isFunction } from "lodash";

export const AppLink = ({
  link,
  text = "",
  className = "",
  activeClass = "",
  style,
  append,
  prepend,
  children,
  ...props
}) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive ? `${className} ${activeClass}` : className
      }
      {...props}
    >
      {prepend}

      <span>{text}</span>
      {append}

      {isFunction(children) ? children() : children}
    </NavLink>
  );
};

AppLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
  activeClass: PropTypes.string,
  style: PropTypes.object,
  append: PropTypes.node,
  prepend: PropTypes.node,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};
