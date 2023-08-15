import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

export const UploadBase = ({
	className = "",
	accept = ".png,.jpg,.jpeg",
	isMultiple = false,
	isDisabled = false,
	onFileUpload,
	children,
}) => {
	return (
		<label className={cn(className, { cursor_pointer: !isDisabled })}>
			<input
				type="file"
				accept={accept}
				multiple={isMultiple}
				onChange={onFileUpload}
				hidden={true}
				disabled={Boolean(isDisabled)}
			/>

			{children}
		</label>
	);
};

UploadBase.propTypes = {
	className: PropTypes.string,
	accept: PropTypes.string,
	isMultiple: PropTypes.bool,
	onFileUpload: PropTypes.func,
	children: PropTypes.node,
};
