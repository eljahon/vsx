import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import "./RadioButton.scss";

export const RadioButton = ({ label, value, field,form}) => {
	// // console.log(field,form)
	// const [checked, setChecked] = useState();
	//
	// const hadelChanges =(evetn) => {
	// 	// console.log(evetn.target.value)
	// 	form.setFieldValue(
	// 		field.name, evetn.target.value
	// 	)
	// 	setChecked(true)
	// }
	// useEffect(() => {
	// 	console.log(value)
	// 	if(field.value&&value==='ha') {
	// 		setChecked(true)
	// 	}
	// },[field.value])
	return (
		<label className="radio text-select_none cursor_pointer">
			<div className="radio__label">
				<input className="radio__input" {...field} type="radio" value={value}/>
				<span className="radio__checkmark">
					<span className="radio__checkmark-inner"></span>
				</span>
			</div>

			{label && <span className="control__text">{label}</span>}
		</label>
	);
};

RadioButton.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	field: PropTypes.object,
	form: PropTypes.object,
};
