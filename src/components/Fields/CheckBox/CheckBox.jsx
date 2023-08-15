import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./CheckBox.scss";

export const CheckBox = ({
  className = "",
  label = "",
  isChecked = false,
  onValueChange,
  field,
  form,
  ...inputProps
}) => {
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
    form.setFieldValue(field.name, newValue?? false);
    onValueChange && onValueChange(newValue);
  };

  useEffect(() => {
    setChecked(field.value);
  }, [field.value]);

  return (
    <label className={classNames}>
      <div className="checkbox__label">
        <input
          type="checkbox"
          hidden
          name={field.name}
          checked={checked}
          onChange={handleChange}
          {...inputProps}
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
