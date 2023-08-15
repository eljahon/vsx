import React from "react";

import "./Spinner.scss";

export const Spinner = ({ className = "loader" }) => {
	return (
		<div className={className}>
			<img
				className="loader__img brand-logo"
				src={require("assets/images/sidebar-logo.png")}
				alt=""
			/>
		</div>
	);
};

// <div className="spinner">
// 	<div className="spinner__inner">
// 		<div></div>
// 		<div></div>
// 		<div></div>
// 		<div></div>
// 		<div></div>
// 		<div></div>
// 		<div></div>
// 		<div></div>
// 	</div>
// </div>
