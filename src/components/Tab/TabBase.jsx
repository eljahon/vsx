import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { Button } from "components";

import "./Tab.scss";

export const TabBase = ({ onPaneChange, className, labels = [], currentLabel }) => {
	return (
		<div className={cn("tab", className)}>
			{labels.map((tabLabel, index) => (
				<Button
					key={index}
					className={cn("tab__label", "mr_40", {
						tab__label_active: tabLabel === currentLabel,
					})}
					text={tabLabel}
					onClick={(event) => onPaneChange(tabLabel, event)}
				/>
			))}
		</div>
	);
};

TabBase.propTypes = {
	className: PropTypes.string,
	onPaneChange: PropTypes.func,
	labels: PropTypes.array,
	currentLabel: PropTypes.string,
};
