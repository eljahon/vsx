import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./Avatar.scss";

export const Avatar = ({ src, size = "sm", borderColor = "grey", className = "", style }) => {
	return (
		<div
			className={cn("avatar", `avatar_${size}`, `avatar-border_${borderColor}`, className)}
			style={style}
		>
			<img src={src} alt="ALT" className="avatar__img" />
		</div>
	);
};

Avatar.propTypes = {
	src: PropTypes.string,
	size: PropTypes.oneOf(["sm", "md", "lg"]),
	borderColor: PropTypes.oneOf(["white", "grey"]),
	style: PropTypes.object,
};
