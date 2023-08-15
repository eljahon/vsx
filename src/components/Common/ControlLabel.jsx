import React from "react";
import { isFunction } from "lodash";
import PropTypes from "prop-types";

import { Typography } from "components";

export const ControlLabel = ({ label }) => {
	return (
		<>
			{label && (
				<Typography Type="h5" className="control__label">
					{() => (isFunction(label) ? label() : label)}
				</Typography>
			)}
		</>
	);
};

ControlLabel.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
