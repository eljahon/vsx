import { useState, useRef, useEffect } from "react";

export const useOutsideClick = ({
	initialIsVisible,
	onOpen = () => {},
	onClose = () => {},
} = {}) => {
	const [isVisible, setIsVisible] = useState(initialIsVisible);
	const ref = useRef(null);

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			handleMenuClose(event);
		}
	};

	const handleMenuOpen = (event) => {
		setIsVisible((prev) => !prev);
		onOpen(event);
	};

	const handleMenuClose = (event) => {
		setIsVisible(false);
		onClose(event);
	};

	const handleMenuToggle = (event) => {
		setIsVisible((prev) => !prev);
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	return { ref, isVisible, handleMenuOpen, handleMenuClose, handleMenuToggle };
};
