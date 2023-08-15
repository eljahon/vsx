import React from "react";
import cn from "classnames";

import { Button, ModalRoot, Spinning, Typography } from "components";

import { ReactComponent as CloseIcon } from "assets/icons/close.svg";

export const ModalDefault = ({
	isOpen,
	handleModalClose,
	outerClass = "",
	innerClass = "",
	title = "",
	subtitle,
	children,
}) => {
	return (
		<ModalRoot
			isOpen={isOpen}
			outerClass={outerClass}
			innerClass={cn("modal-default", "w_full", "p_40", innerClass)}
		>
			<Button className="modal__close" append={<CloseIcon />} onClick={handleModalClose} />

			<div className="text-align_center mb_40">
				<Spinning entity={title}>
					<Typography Type="h2" className="title_md mb_10" text={title} />
				</Spinning>

				<Spinning entity={subtitle}>
					<Typography Type="p" className="color_txt-secondary fz_14">
						{subtitle}
					</Typography>
				</Spinning>
			</div>

			{children}
		</ModalRoot>
	);
};
