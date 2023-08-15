import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./components";

import { ReactComponent as RegistrationStepIcon } from "assets/icons/registration-step.svg";
import { ReactComponent as ProfileStepIcon } from "assets/icons/profile-step.svg";
import { Typography } from "components";

export const ProfileLayout = () => {
	return (
		<>
			<div className="page">
				<Header hasLogo={true} stlye={{ padding: 0 }} hasLanguage={false}>
					<div className="step-auth">
						<div className="step-auth__inner">
							<div className="step-auth__top">
								<RegistrationStepIcon />
								<div className="step-auth__line"></div>
								<ProfileStepIcon />
							</div>

							<div className="step-auth__bottom">
								<Typography
									Type="span"
									className="step-auth__text color_primary-green"
									text="Регистрация"
								/>
								<Typography
									Type="span"
									className="step-auth__text color_brand-yellow"
									text="Профиль"
								/>
							</div>
						</div>
					</div>
				</Header>

				<div className="flex_max container">
					<main className="py_40 px_15">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};
