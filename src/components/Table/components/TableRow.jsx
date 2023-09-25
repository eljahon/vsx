import React from "react";
import { get, isFunction } from "lodash";
import cn from "classnames";
import {CheckBox} from './TableCheckBox/CheckBox/CheckBox'
import { ActionButtons } from "./ActionButtons";

export const TableRow = (props) => {
	const {	row,
		columns,
		deleteAction,
		editAction,
		onRowClick,
		index,
		renderButtons,
		seeAction,
		isChecked,
		isCheckedSee,
		setItemChecked,
		isButtonsVisible,} = props;
	// console.log(props)
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
						<span className='d-flex' style={{gap: 10+"px", alignItems: 'center'}}>
							{innerIndex === 0 && isCheckedSee && <CheckBox row={row} isChecked={isChecked} setItemChecked={setItemChecked}/>}
							{/*{row}*/}
							{col.render(row[col.dataKey], row, index)}
						</span>
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
						seeAction={seeAction}
						isButtonsVisible={isButtonsVisible}
					/>
				</td>
			)}
		</tr>
	);
};
