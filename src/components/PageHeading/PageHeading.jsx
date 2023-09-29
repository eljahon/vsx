import React from "react";
import { isFunction } from "lodash";

import {Button, DropDown, Fields} from "components";
import { Breadcrumb, Statistics } from "./components";
import { utils } from "../../services";
import "./PageHeading.scss";

export const PageHeading = (props) => {
	const {links,btnText,mainAction,headerTile,statistics,isFilter,isRegion,isDisabled} = props;
	return (
		<div className="page-heading">
			<div className="page-heading__inner">
				{/*<Breadcrumb links={links} />*/}
				<h1 className='page-header__inner__title'>{headerTile}</h1>

				{isFunction(mainAction) && (
					<Button
						className="btn page-heading__btn"
						design="primary"
						text={btnText}
						isDisabled={isDisabled}
						onClick={mainAction}
					/>
				)}
				{isFilter &&
					<Fields.RangePicker
						size="xsm"
						className="filter__control mr_15"
						onDateChange={(date) => {
							const { start_at, end_at } = utils.formatters.getRange(date);
							setFieldValue("range", date);
							setFilter((prev) => ({
								...prev,
								start_at,
								end_at,
							}));
						}}
					/>}
				{/*{isRegion&& <DropDown>*/}

				{/*</DropDown>}*/}
			</div>

			{/*<Statistics statistics={statistics} />*/}
		</div>
	);
};
