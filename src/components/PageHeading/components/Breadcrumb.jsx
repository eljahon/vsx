import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { AppLink } from "components";

export const Breadcrumb = ({ className = "", links = [] }) => {
	return (
		<div className={cn("breadcrumb", className)}>
			{links.map((link, index) => {
				const notLastLink = index !== links.length - 1;

				return (
					<React.Fragment key={index}>
						{notLastLink ? (
							<AppLink
								link={link.link}
								className="breadcrumb__link"
								text={link.label}
							/>
						) : (
							<div className="breadcrumb__link">{link.label}</div>
						)}

						{notLastLink && <div className="breadcrumb__separator">/</div>}
					</React.Fragment>
				);
			})}
		</div>
	);
};

Breadcrumb.propTypes = {
	className: PropTypes.string,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			link: PropTypes.string,
			label: PropTypes.string,
		})
	),
};
