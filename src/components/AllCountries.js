import React from "react";
import CardContent from "@material-ui/core/CardContent";
import { numberFormatterSecond } from "../helper";

function AllCountries({ tableData }) {
	return (
		<CardContent className='table'>
			<h3 className='table__title'> List of all Countries </h3>
			<tr>
				<th>Countries</th>
				<th>Total Cases</th>
			</tr>
			{tableData.map((tableitem) => {
				return (
					<tr>
						<td> {tableitem.country} </td>
						<td> {numberFormatterSecond(tableitem.cases)} </td>
					</tr>
				);
			})}
		</CardContent>
	);
}

export default AllCountries;
