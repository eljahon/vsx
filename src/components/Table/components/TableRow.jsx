import React from "react";
import { get, isFunction } from "lodash";
import cn from "classnames";

import { ActionButtons } from "./ActionButtons";

export const TableRow = ({
	row,
	columns,
	deleteAction,
	editAction,
	onRowClick,
	renderButtons,
	isButtonsVisible,
}) => {
	return (
		<tr
			className={cn("table__tr", { cursor_pointer: onRowClick })}
			onClick={() => {
				isFunction(onRowClick) && onRowClick(row);
			}}
		>
			{columns.map((col, innerIndex) => {
				return (
					<td key={innerIndex} className={`table__td ${get(col, "className", "")}`}>
						{col.render(row[col.dataKey], row)}
					</td>
				);
			})}

			{(editAction || deleteAction || renderButtons) && (
				<td className="table__td">
					<ActionButtons
						row={row}
						editAction={editAction}
						deleteAction={deleteAction}
						renderButtons={renderButtons}
						isButtonsVisible={isButtonsVisible}
					/>
				</td>
			)}
		</tr>
	);
};
