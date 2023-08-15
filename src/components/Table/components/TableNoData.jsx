import React from "react";

import { ReactComponent as NoDataIcon } from "assets/icons/table-no-results.svg";
import { Typography } from "components";

export const TableNoData = ({ emptyUiText }) => {
	return (
		<div className="table-no-data">
			<div className="table-no-data__inner">
				<NoDataIcon />

				<Typography Type="span" className="table-no-data__text" text={emptyUiText} />
			</div>
		</div>
	);
};
