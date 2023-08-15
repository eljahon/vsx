import parse from "html-react-parser";

export const parser = (reactNode) => {
	try {
		return parse(reactNode);
	} catch (error) {
		return reactNode;
	}
};
