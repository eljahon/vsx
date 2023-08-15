import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./Status.scss";

export const Status = ({ message, type, ...divProps }) => {
	return (
		<div className={cn("status", `status_${type}`)} {...divProps}>
			{message}
		</div>
	);
};

Status.propTypes = {
	message: PropTypes.string,
	type: PropTypes.oneOf(["success", "warning", "danger"]),
};
