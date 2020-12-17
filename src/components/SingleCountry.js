import React from "react";
import CardContent from "@material-ui/core/CardContent";
import { numberFormatter, numberFormatterSecond } from "../helper";

function SingleCountry({ cardData, moreCardData }) {
	return (
		<CardContent className='country__card'>
			<h1 className='country__card-title'> {cardData.country} </h1>
			<div className='country__info-container'>
				<div
					className='country__card-image'
					style={{
						backgroundImage: `url(${moreCardData.flag})`,
					}}></div>
				<div>
					<strong>Country:</strong> {cardData.country}
				</div>
				<div>
					<strong>Continet:</strong> {cardData.continent}
				</div>
				<div>
					<strong>Total Population:</strong>{" "}
					{numberFormatterSecond(cardData.population)} (
					{numberFormatter(cardData.population)})
				</div>
				<div>
					<strong>Total Cases:</strong> {numberFormatterSecond(cardData.cases)}{" "}
					({numberFormatter(cardData.cases)})
				</div>
				<div>
					<strong>Total Recovered:</strong>{" "}
					{numberFormatterSecond(cardData.recovered)} (
					{numberFormatter(cardData.recovered)})
				</div>
				<div>
					<strong>Total Deaths:</strong>{" "}
					{numberFormatterSecond(cardData.deaths)} (
					{numberFormatter(cardData.deaths)})
				</div>
			</div>
		</CardContent>
	);
}

export default SingleCountry;
