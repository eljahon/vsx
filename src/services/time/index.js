import dayjs from "dayjs";

export const time = {
	toTimestamp: (date) => dayjs(date).unix(),
	toDate: (timestamp) => (timestamp ? dayjs.unix(timestamp).toDate() : dayjs().toDate()),

	formatTimestamp: (timestamp, format = "DD.MM.YYYY") =>
		timestamp ? dayjs.unix(timestamp).format(format) : "",
	timeFormater: (time, format) => dayjs(time).format(format)
};
