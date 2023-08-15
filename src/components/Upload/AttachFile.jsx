import React, { useState } from "react";
import PropTypes from "prop-types";
import { serialize } from "object-to-formdata";
import { get, isFunction } from "lodash";

import { httpClient } from "services";

import { Typography } from "components";
import { UploadBase } from "./UploadBase";

import { ReactComponent as AttachIcon } from "assets/icons/attach.svg";

export const AttachFile = ({
	title = "Прикрепить файл",
	accept = ".png,.jpg,.jpeg",
	getFile,
	form,
	field,
}) => {
	const [file, setFile] = useState();

	const handleImageUpload = (event) => {
		const files = serialize({ files: event.target.files });

		httpClient
			.post("/file", files)
			.then(({ data }) => {
				form.setFieldValue(field.name, data);
				setFile(event.target.files[0]);
			})
			.catch((error) => {
				form.setFieldValue(field.name, null);
			});
	};

	return (
		<UploadBase
			className="d-flex align-items-center justify-content-center"
			accept={accept}
			onFileUpload={handleImageUpload}
			isDisabled={file}
		>
			<AttachIcon className="mr_10" />
			<Typography
				Type="span"
				className="color_txt-secondary fz_18"
				text={file ? file.name : title}
			/>
		</UploadBase>
	);
};

AttachFile.propTypes = {
	title: PropTypes.string,
	accept: PropTypes.string,
	getFile: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
