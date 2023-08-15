import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import cn from "classnames";

import { Button } from "components";

import { ReactComponent as LeftArrow } from "assets/icons/pagination-arrow-left.svg";
import { ReactComponent as RightArrow } from "assets/icons/pagination-arrow-right.svg";

import "./Pagination.scss";

export const Pagination = ({ pageCount, currentPage, className = "mt_30", onPageChange }) => {
	if (pageCount <= 1 || !pageCount) return "";

	return (
		<div className={cn("pagination", className)}>
			<ReactPaginate
				pageCount={pageCount}
				initialPage={currentPage - 1}
				forcePage={currentPage - 1}
				disableInitialCallback={true}
				previousLabel={<Button className="pagination__control" append={<LeftArrow />} />}
				nextLabel={<Button className="pagination__control" append={<RightArrow />} />}
				containerClassName="pagination__inner"
				pageClassName="pagination__item"
				breakClassName="pagination__item"
				pageLinkClassName="pagination__link"
				activeLinkClassName="pagination__link_active"
				nextClassName="ml_30"
				previousClassName="mr_40"
				disabledClassName="pagination_disabled"
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={(page) => onPageChange(page.selected)}
			/>
		</div>
	);
};

Pagination.propTypes = {
	pageCount: PropTypes.number,
	currentPage: PropTypes.number,
	className: PropTypes.string,
	onPageChange: PropTypes.func,
};
