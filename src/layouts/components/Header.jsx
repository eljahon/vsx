import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import {useTranslation} from "react-i18next";
import { Typography } from "components";
import { Profile } from "./Profile";
import { Messages } from "./Messages";
import { Language } from "./Language";
import { formatters } from "services/utils";
import logo from "../../assets/images/logo.svg";

export const Header = ({
	hasLogo,
	hasNotification,
	hasProfile,
	hasLanguage = true,
	children,
	style,
	containerClass = "",
}) => {
	const {t} = useTranslation()
	const { pathname } = useLocation();
	const menuKey = pathname.split("/")[1];

	return (
		<header className="header" style={style}>
			<div className={cn("container", containerClass)}>
				<div className="header__inner">
					{hasLogo && (
						<div className="header__logo d-flex align-items-center">
							<img
								className="brand-logo"
								src={logo}
								alt="logo"
							/>
							<h1 className="ml-10 fz_20">{t('vsx-title')}</h1>
						</div>
					)}

					{hasLanguage && <Language />}

					{hasNotification && (
						<>
							{/* <Messages /> */}
							<Messages notification={true} />
						</>
					)}

					{hasProfile && <Profile />}

					{children}
				</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	hasNotification: PropTypes.bool,
	hasProfile: PropTypes.bool,
	children: PropTypes.node,
};
