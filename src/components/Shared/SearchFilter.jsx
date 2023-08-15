import React from "react";

import { Fields } from "components";

import SearchIcon from "assets/icons/filter-search.svg";

export const SearchFilter = ({ form, field }) => {
	return (
		<Fields.InputText
			form={form}
			field={field}
			prepend={<img src={SearchIcon} alt="" />}
			size="xsm"
			outerClass="filter__control"
			placeholder="Поиск ..."
		/>
	);
};
