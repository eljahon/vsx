import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { Typography, Spinning } from "components";

export const Statistics = ({ className = "", statistics = [] }) => {
	return (
		<Spinning entity={statistics}>
			<div className={cn("list-statistics", "mt_40", className)}>
				{statistics.map((statistic, index) => (
					<div key={index} className="list-statistics__item">
						<Typography
							Type="h4"
							className="list-statistics__title"
							text={statistic.label}
						/>
						<Typography
							Type="p"
							className="list-statistics__value"
							text={statistic.value}
						/>
					</div>
				))}
			</div>
		</Spinning>
	);
};

Statistics.propTypes = {
	statistics: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		})
	),
};
