import React from "react";
import { get, isFunction } from "lodash";
import {CheckBox} from './TableCheckBox/CheckBox/CheckBox'
export const Head = ({ columns, deleteAction, editAction, renderButtons, isCheckedSee, isChecked, handelChecketAll }) => {
	return (
		<thead className="table__head">
			<tr>

				{columns.map((col, index) => (
					<th
						key={index}
						className={`table__th ${get(col, "className", "")}`}
						onClick={isFunction(col.onHeadClick) ? () => col.onHeadClick(col) : null}
					>
						<span className='d-flex' style={{gap: 10+'px', alignItems: 'center'}}>{index === 0 && isCheckedSee && <CheckBox isChecked={isChecked} onValueChange={handelChecketAll}/>}
							{get(col, "title")}</span>
					</th>
				))}
				{(editAction || deleteAction || renderButtons) && <th className="table__th"></th>}
			</tr>
		</thead>
	);
};
