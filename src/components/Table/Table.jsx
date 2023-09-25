import React, {useState} from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { Spinner } from "components";
import { Head, TableNoData, TableRow } from "./components";

import "./Table.scss";

export const Table = ({
	className = "",
	isLoading,
	rowKey = "id",
	columns = [],
	items = [],
	deleteAction,
	setChecked,
	seeAction,
    isCheckedSee,
	editAction,
	onRowClick,
	emptyUiText,
	isButtonsVisible,
	renderButtons,
	filterComponent,
	isChecked,
       checkedList,
    isHeaderChecked
}) => {
	const classNames = cn("table__wrapper", className);
	// const [checkedList, setCheckedList] = useState([])
	const handelChecketAll =(isCheckedAll, id='all') =>  {
		console.log(isCheckedAll, id)
		setChecked({isCheckedAll, id})
	}
	return (
		<div className={classNames}>
			{!items.length && !isLoading ? (
				<TableNoData emptyUiText={emptyUiText} />
			) : (
				<>
					{!isLoading && filterComponent}
					<table
						className={cn("table", { "table__no-filter": !filterComponent })}
						cellSpacing={0}
					>
						<Head
							handelChecketAll={handelChecketAll}
							isChecked={isHeaderChecked}
							isCheckedSee={isCheckedSee}
							columns={columns}
							deleteAction={deleteAction}
							editAction={editAction}
							renderButtons={renderButtons}
						/>

						<tbody className="table__body">
							{isLoading ? (
								<tr>
									<td colSpan="100%">
										<Spinner className="table-spinner" />
									</td>
								</tr>
							) : (
								items.map((row, index) => (
									<TableRow
										index={index}
										key={row[rowKey]}
										row={row}
										columns={columns}
										isCheckedSee={isCheckedSee}
										isChecked={checkedList?.includes(row.id)}
										setItemChecked={handelChecketAll}
										deleteAction={deleteAction}
										editAction={editAction}
										seeAction={seeAction}
										onRowClick={onRowClick}
										renderButtons={renderButtons}
										isButtonsVisible={isButtonsVisible}
									/>
								))
							)}
						</tbody>
					</table>
				</>
			)}
		</div>
	);
};

Table.propTypes = {
	className: PropTypes.string,
	rowKey: PropTypes.string,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			dataKey: PropTypes.string,
			className: PropTypes.string,
			render: PropTypes.func,
			onHeadClick: PropTypes.func,
		})
	),
	items: PropTypes.array,
	deleteAction: PropTypes.func,
	editAction: PropTypes.func,
	emptyUi: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	onRowClick: PropTypes.func,
	renderButtons: PropTypes.func,
};
