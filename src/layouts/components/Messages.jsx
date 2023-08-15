import React from "react";

import { Typography, Button, DropDown } from "components";

import { ReactComponent as MessageIcon } from "assets/icons/message.svg";
import { ReactComponent as MessageSuccessIcon } from "assets/icons/menu-message-success.svg";
import { ReactComponent as MessageWarningIcon } from "assets/icons/menu-message-warning.svg";
import { ReactComponent as MessageDangerIcon } from "assets/icons/menu-message-danger.svg";
import { ReactComponent as NotificationIcon } from "assets/icons/notification.svg";

export const Messages = ({ notification }) => {
	return (
		<>
			<DropDown
				outerClass="mr_20"
				innerClass="message__menu"
				offset="20px"
				hasPointer={true}
				renderTrigger={(handleMenuToggle) => (
					<>
						<Button design="circled" onClick={handleMenuToggle}>
							{notification ? <NotificationIcon /> : <MessageIcon />}
							<span className="badge header__badge">2</span>
						</Button>
					</>
				)}
			>
				<div className="menu-message__inner">
					<div className="menu-message__heading">
						<Typography className="menu-message__title" text="Уведомления" />
					</div>

					<div className="menu-message__item">
						<div
							className="menu-message__icon"
							style={{ background: "var(--light-blue)" }}
						>
							<MessageSuccessIcon />
						</div>

						<div>
							<Typography
								Type="h5"
								className="menu-message__name"
								text="ваши 5 заказов прибыли."
							/>

							<Typography
								Type="p"
								className="menu-message__descr"
								text="Вас попросят подтвердить их."
							/>
						</div>
					</div>

					<div className="menu-message__item">
						<div
							className="menu-message__icon"
							style={{ background: "var(--light-yellow)" }}
						>
							<MessageWarningIcon />
						</div>

						<div>
							<Typography
								Type="h5"
								className="menu-message__name"
								text="ваши 5 заказов прибыли."
							/>

							<Typography
								Type="p"
								className="menu-message__descr"
								text="Вас попросят подтвердить их."
							/>
						</div>
					</div>

					<div className="menu-message__item">
						<div
							className="menu-message__icon"
							style={{ background: "var(--light-red)" }}
						>
							<MessageDangerIcon />
						</div>

						<div>
							<Typography
								Type="h5"
								className="menu-message__name"
								text="ваши 5 заказов прибыли."
							/>

							<Typography
								Type="p"
								className="menu-message__descr"
								text="Вас попросят подтвердить их."
							/>
						</div>
					</div>
				</div>
			</DropDown>
		</>
	);
};
