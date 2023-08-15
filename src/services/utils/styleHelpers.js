const changeStyleVariables = (styles = {}) => {
	Object.entries(styles).forEach(([key, value]) => {
		document.documentElement.style.setProperty(key, value);
	});
};

const calculateHeight = (element) => {
	let height = 0;
	if (element) {
		const submenu = element.childNodes[1];
		submenu.childNodes.forEach((child) => {
			const style = getComputedStyle(child);
			const marginTop = Number(style.marginTop.replace(/([A-Z][a-z])/gi, ""));
			const marginBottom = Number(style.marginBottom.replace(/([A-Z][a-z])/gi, ""));

			height = height + Number(child.offsetHeight) + marginTop + marginBottom;
		});
	}
	return height;
};

export const styleHelpers = {
	changeStyleVariables,
	calculateHeight,
};
