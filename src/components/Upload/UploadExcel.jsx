import React from "react";
import { serialize } from "object-to-formdata";

import { httpClient } from "services";

import { UploadBase } from "components/Upload/UploadBase";

export const UploadExcel = ({
	url,
	children,
	className,
	onBeforeUpload,
	onFileUploaded,
	onError,
	onFinal = () => {},
}) => {
	const handleExcelUpload = (event) => {
		onBeforeUpload && onBeforeUpload();
		httpClient
			.post(url, serialize({ file: event.target.files[0] }))
			.then(({ data }) => onFileUploaded(data))
			.catch((error) => onError && onError(error))
			.finally(onFinal);
	};

	return (
		<UploadBase className={className} accept=".xlsx" onFileUpload={handleExcelUpload}>
			{children}
		</UploadBase>
	);
};
