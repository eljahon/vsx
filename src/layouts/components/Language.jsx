import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";

import { system } from "store/actions";

import { Button, DropDown } from "components";

import { ReactComponent as Arrow } from "assets/icons/drop-down-arrow-thin.svg";
import Uz from "assets/icons/uz.svg";
import Ru from "assets/icons/ru.svg";
import { useTranslation } from "react-i18next";

const languages = [
	{
		img: <img src={Uz} alt="" />,
		code: "uz",
	},
	{
		img: <img src={Ru} alt="" />,
		code: "ru",
	},
];

export const Language = () => {
	const dispatch = useDispatch();
	const { i18n } = useTranslation();

	const [currentLanguage, setCurrentLanguage] = useState({
		img: <img src={Ru} alt="" />,
		code: "ru",
	});

	const handleLngChange = (lng, handleMenuClose, event) => {
		setCurrentLanguage(lng);
		dispatch(system.changeLanguage(lng.code));
		i18n.changeLanguage(lng.code);
		handleMenuClose();
	};

	return (
		<DropDown
			renderTrigger={(handleMenuToggle, isVisible) => (
				<Button
					prepend={currentLanguage.img}
					text={currentLanguage.code}
					className="language__item"
					append={
						<Arrow className={cn("transition-default", { rotate_180: isVisible })} />
					}
					onClick={handleMenuToggle}
				/>
			)}
			innerClass="language"
			outerClass="mr_30"
		>
			{(handleMenuClose) =>
				languages
					.filter((item) => item.code !== currentLanguage.code)
					.map((item) => (
						<Button
							key={item.code}
							prepend={item.img}
							text={item.code}
							className="language__item"
							onClick={(event) => handleLngChange(item, handleMenuClose, event)}
						/>
					))
			}
		</DropDown>
	);
};
