import numeral from "numeral";

export const numberFormatter = (stat) =>
	// eslint-disable-next-line no-unused-expressions
	stat ? `+${numeral(stat).format("0.0a")}` : "+0";
