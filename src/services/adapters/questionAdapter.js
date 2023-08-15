import { isEmpty } from "lodash";

export const questionAdapter = (questions = [], allQuestions = []) => {
	if (isEmpty(questions)) return allQuestions;
	else {
		return allQuestions.reduce((prev, item) => {
			const foundItem = questions.findLast((question) => question.question.id === item.id);

			return [
				...prev,
				foundItem
					? foundItem
					: {
							question: item,
							answer: "",
					  },
			];
		}, []);
	}
};
