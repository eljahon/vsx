import React, { useEffect, useState } from "react";
import cn from "classnames";

import { Portal } from "components";
import { ModalWrapper } from "./ModalWrapper";

import "./Root.scss";

export const Root = ({ children, isOpen, outerClass = "", innerClass = "", style }) => {
	const [display, setDisplay] = useState("none");
	const [isModalOpen, setIsModalOpen] = useState(isOpen);

	useEffect(() => {
		setDisplay((prev) => {
			return isOpen
				? "flex"
				: setTimeout(() => {
						setDisplay("none");
				  }, 200);
		});

		setIsModalOpen((prev) => {
			if (isOpen === true) setTimeout(() => setIsModalOpen(true), 200);
			else return false;
		});
	}, [isOpen]);

	return (
		<Portal targetId="modal-root">
			<div className={cn("modal__inner", outerClass)} style={{ display }}>
				<ModalWrapper isOpen={isModalOpen} className={innerClass} style={style}>
					{children}
				</ModalWrapper>
			</div>
		</Portal>
	);
};
