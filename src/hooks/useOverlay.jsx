import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isFunction } from "lodash";

import { overlay } from "store/actions";
import { constants, utils } from "services";

export const 	useOverlay = ({ uniqueName, onOpen, onClose } = {}) => {
	const dispatch = useDispatch();
	const isOverlayOpen = useSelector((state) => state.overlay[uniqueName]);

	const handleOverlayOpen = () => {
		dispatch(overlay.open(uniqueName));

		utils.styleHelpers.changeStyleVariables({
			overflow: "hidden",
			"--modal-opacity": "1",
			"--modal-pointer-events": "initial",
		});

		isFunction(onOpen) && onOpen();
	};

	const handleOverlayClose = () => {
		dispatch(overlay.close(uniqueName));

		utils.styleHelpers.changeStyleVariables({
			overflow: "initial",
			"--modal-opacity": "0",
			"--modal-pointer-events": "none",
		});

		isFunction(onClose) && onClose();
	};

	const handlePressEsc = (event) => {
		// console.log('salom', event.keyCode)
		if (event.keyCode === constants.KEYCODE_ESC) handleOverlayClose();
	};

	useEffect(() => {
		document.addEventListener("keydown", handlePressEsc);

		return () => {
			document.removeEventListener("keydown", handlePressEsc);
		};
	}, []);

	return {
		isOverlayOpen,
		handleOverlayOpen,
		handleOverlayClose,
	};
};
