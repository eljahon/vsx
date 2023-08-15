import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as SearchIcon } from "assets/icons/search.svg";

export const HeaderSearch = () => {
	return (
		<form
			className="header__search-form "
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<label className="header__search-wrapper">
				<SearchIcon />
				<input type="text" placeholder="Поиск ..." className="header__search-input" />
			</label>
		</form>
	);
};

HeaderSearch.propTypes = {
	className: PropTypes.string,
};
