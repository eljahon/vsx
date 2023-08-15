import React, { useEffect, useState } from "react";

import { ReactComponent as TimeIcon } from "assets/icons/time.svg";
import { Typography } from "components";

export const Timer = () => {
	const [timer, setTimer] = useState(60);

	useEffect(() => {
		setInterval(() => {
			setTimer((prev) => (prev !== 0 ? prev - 1 : prev));
		}, 1000);
	}, []);

	return (
		<div className="code-timer">
			<TimeIcon className="mr_10" />
			<Typography Type="span" className="code-timer__count" text={`0:${timer}`} />
		</div>
	);
};
