import React from "react";
import PropTypes from "prop-types";
import { isFunction } from "lodash";

export const Typography = ({
  Type = "h1",
  text = "",
  className = "",
  style,
  append,
  prepend,
  children,
  ...props
}) => {
  return (
    <Type className={className} {...props}>
      {prepend}
      {text}
      {append}

      {isFunction(children) ? children() : children}
    </Type>
  );
};

Typography.propTypes = {
  Type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
  append: PropTypes.node,
  prepend: PropTypes.node,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};
