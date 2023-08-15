export const documentAdapter = (documents = []) =>
	documents.reduce((prev, item) => [...prev, item.file], []);
