import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./CheckBox.scss";

export const CheckBox = (props) => {
  const {
    className = "",
    label = "",
    isChecked = false,
    onValueChange,
    name,
    setItemChecked,
      row
  } = props
  const classNames = cn(
    "checkbox",
    "cursor_pointer",
    "text-select_none",
    className
  );
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.checked;
    setChecked(newValue);
    setItemChecked && setItemChecked(newValue, row.id)
    onValueChange && onValueChange(newValue);
  };
  return (
    <label className={classNames}>
      <div className="checkbox__label">
        <input
          type="checkbox"
          hidden
          name={name}
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="checkbox__checkmark">
          <span className="checkbox__ticket"></span>
        </span>
      </div>
      {label && <span className="control__text">{label}</span>}
    </label>
  );
};

CheckBox.propTypes = {
  isChecked: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  checked: PropTypes.bool,
  field: PropTypes.object,
  form: PropTypes.object,
};
