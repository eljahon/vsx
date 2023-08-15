import React from "react";
import cn from "classnames";

import { useOutsideClick } from "hooks";
import { utils } from "services";

import { AppLink, Button } from "components";

import { ReactComponent as SubMenuIcon } from "assets/icons/drop-down-arrow.svg";

export const SubMenu = ({ menu }) => {
	const { ref, isVisible, handleMenuToggle } = useOutsideClick();

	return (
		<div className="sidebar__menu-group" ref={ref}>
			<Button
				className={cn("sidebar__link", {
					sidebar__link_active: isVisible,
				})}
				onClick={handleMenuToggle}
			>
				{() => (
					<>
						{menu.icon}
						{menu.label}
						<div
							className={cn("sidebar__submenu-toggle", {
								"sidebar__submenu-toggle_active": isVisible,
							})}
						>
							<SubMenuIcon />
						</div>
					</>
				)}
			</Button>

			<div
				className={cn("sidebar__submenu")}
				style={{
					height: isVisible ? utils.styleHelpers.calculateHeight(ref.current) : 0,
				}}
			>
				{menu.submenu.map(({ id, label, link, icon }) => (
					<AppLink
						key={id}
						className="sidebar__link ml_20"
						link={link}
						text={label}
						activeClass="sidebar__submenu-link_active"
					/>
				))}
			</div>
		</div>
	);
};
