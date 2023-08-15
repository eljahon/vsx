import React from "react";
import PropTypes from "prop-types";
import { Typography } from "components";

import { get } from "lodash";

export const ControlError = ({ form, field }) => {
	return (
		<>
			{get(form.touched, field.name) && get(form.errors, field.name) && (
				<Typography Type="span" className="control__error" text={form.errors[field.name]} />
			)}
		</>
	);
};

ControlError.propTypes = {
	form: PropTypes.object,
	field: PropTypes.object,
};
