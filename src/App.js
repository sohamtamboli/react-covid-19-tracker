import React, { useState, useEffect } from "react";
import "./App.scss";
import { numberFormatter } from "./helper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import StatBoxes from "./components/StatBoxes";

function App() {
	const [countries, setCountries] = useState([]);
	const [singleCountry, setSingleCountry] = useState("worldwide");
	const [countryData, setCountryData] = useState({});
	// const [flag, setFlag] = useState(false);

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((res) => res.json())
			.then((data) => {
				setCountryData(data);
			});
	}, []);

	useEffect(() => {
		const countriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((res) => res.json())
				.then((data) => {
					const countriesAll = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso3,
					}));
					setCountries(countriesAll);
				});
		};

		countriesData();
	}, []);

	const selectCountry = async (e) => {
		const selectedCountry = e.target.value;
		const url =
			selectedCountry === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

		await fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setSingleCountry(selectedCountry);
				setCountryData(data);
			});
	};
	console.log("This is formatted ===", numberFormatter(countryData.todayCases));
	console.log("This is NOT formatted ===", countryData.todayCases);
	return (
		<div className='app'>
			<div className='header__body'>
				{/* Header */}
				<h1 className='app__title'>Covid-19 Tracker</h1>
				<div className='app__country__selector'>
					<FormControl variant='filled'>
						<Select
							value={singleCountry}
							onChange={selectCountry}
							className='selector__container'>
							<MenuItem value='worldwide'>Worldwide</MenuItem>
							{countries.map((country, index) => {
								return (
									<MenuItem value={country.value} key={index}>
										{country.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</div>
			</div>
			<div className='stats'>
				{/* status boxes */}
				<StatBoxes
					title={"Cases"}
					todaysStats={numberFormatter(countryData.todayCases)}
					total={numberFormatter(countryData.cases)}
				/>
				<StatBoxes
					title={"Recovered"}
					todaysStats={numberFormatter(countryData.todayRecovered)}
					total={numberFormatter(countryData.recovered)}
				/>
				<StatBoxes
					title={"Deaths"}
					todaysStats={numberFormatter(countryData.todayDeaths)}
					total={numberFormatter(countryData.deaths)}
				/>
			</div>
		</div>
	);
}

export default App;
