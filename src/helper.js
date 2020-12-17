import numeral from "numeral";

export const numberFormatter = (stat) =>
	// eslint-disable-next-line no-unused-expressions
	stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const numberFormatterSecond = (val) =>
	// eslint-disable-next-line no-unused-expressions
	val ? `${numeral(val).format("0,0")}` : "+0";

export const dataSorting = (data) => {
	const dataArray = [...data];

	return dataArray.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
