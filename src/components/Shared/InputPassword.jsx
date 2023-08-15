import React, { useState } from "react";

import { Button, Fields } from "components";

import { ReactComponent as PasswordIcon } from "assets/icons/password.svg";
import { ReactComponent as EyeVisibleIcon } from "assets/icons/eye-visible.svg";
import { ReactComponent as EyeHiddenIcon } from "assets/icons/eye-hidden.svg";

export const InputPassword = ({ ...inputProps }) => {
	const [type, setType] = useState("password");

	const handleTypeChange = (event) => {
		setType((prev) => {
			if (prev === "password") return "text";
			else return "password";
		});
	};

	return (
		<Fields.InputText
			{...inputProps}
			type={type}
			// prepend={<PasswordIcon />}
			append={
				<Button
					style={{ width: "20px", height: "20px" }}
					onClick={handleTypeChange}
					append={type === "password" ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
				/>
			}
		/>
	);
};
