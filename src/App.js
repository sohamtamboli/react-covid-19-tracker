import React, { useState, useEffect } from "react";
import "./App.scss";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function App() {
	const [countries, setCountries] = useState([]);
	const [singleCountry, setSingleCountry] = useState("worldwide");

	// const handleChange = (event) => {
	// 	setCountries(event.target.value);
	// };
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

	const selectCountry = (e) => {
		const selectedCountry = e.target.value;

		setSingleCountry(selectedCountry);
	};

	return (
		<div className='app'>
			<div className='app__body'>
				<h1 className='app__title'>Covid-19 Tracker</h1>
				<div className='app__country__selector'>
					<FormControl variant='filled'>
						<Select
							id='demo-simple-select-filled'
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
		</div>
	);
}

export default App;
