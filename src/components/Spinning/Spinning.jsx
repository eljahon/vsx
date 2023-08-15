import PropTypes from "prop-types";
import { isEmpty, isFunction } from "lodash";

export const Spinning = ({ entity, fallback, children }) => {
	if (!isEmpty(entity) || isFunction(entity)) return children;
	else return fallback;
};

Spinning.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.func,
		PropTypes.number,
		PropTypes.string,
	]),
	fallback: PropTypes.node,
	children: PropTypes.node,
};
