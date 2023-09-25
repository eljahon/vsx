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
	setItemChecked
}) => {
	const classNames = cn("table__wrapper", className);
	const [isHeaderChecked, setIsHeaderCheaked] = useState(false)
	const [checkedList, setCheckedList] = useState([])
	const handelChecketAll =(isCheckedAll, id='all') =>  {
		if(isCheckedAll && id === 'all') {

            setIsHeaderCheaked(true)
			setCheckedList(items.map(el=> el.id));
			setChecked&&setChecked(items.map(el=> el.id), setCheckedList)

		} else if(!isCheckedAll && id ==='all'){

			setIsHeaderCheaked(false)
			setCheckedList([])
			setChecked&&setChecked([])

		} else if (isCheckedAll && id !== 'all') {

			setCheckedList(old => [...old, id])
			setChecked&&setChecked(old => [...old, id])

		} else if (!isCheckedAll && id !== 'all') {

			setCheckedList(checkedList.filter(el=> el !==id ))
			setChecked&&setChecked(old => [...old].filter(el=> el !== id))

		}
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
