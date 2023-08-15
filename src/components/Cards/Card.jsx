import React from "react";
import { useNavigate } from "react-router-dom";

import { parser } from "services";

import { ActionButtons, Typography } from "components";

export const Card = ({ title, icon, link, editAction, deleteAction, item }) => {
	const navigate = useNavigate();

	return (
		<div className="store-card cursor_pointer" onClick={(event) => navigate(link)}>
			{parser(icon)}
			<Typography Type="span" text={title} className="store-card__title ml_10" />
			<ActionButtons editAction={editAction} deleteAction={deleteAction} row={item} />
		</div>
	);
};
