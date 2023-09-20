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
		// const files = serialize({ files: event.target.files });
		const image = event?.target?.files[0];
		const formdata = new FormData()
		formdata.append('files', image)
		// console.log(files)
		httpClient
			.post("/upload", formdata)
			.then(({ data }) => {
				console.log(data)
				form.setFieldValue(field.name, data[0].id);
				setFile(event.target.files[0]);
			})
			.catch((error) => {
				form.setFieldValue(field.name, null);
			});
	};
	// isDisabled={file}
	return (
		<UploadBase
			className="d-flex align-items-center justify-content-center"
			accept={accept}
			onFileUpload={handleImageUpload}
		>
			<AttachIcon className="mr_10" />
			{/*<span className="loader"></span>*/}
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
