import React, { useState, useEffect } from "react";
import "./App.scss";
import { numberFormatter, dataSorting } from "./helper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import StatBoxes from "./components/StatBoxes";
import Card from "@material-ui/core/Card";
import AllCountries from "./components/AllCountries";
import SingleCountry from "./components/SingleCountry";

function App() {
	const [countries, setCountries] = useState([]);
	const [singleCountry, setSingleCountry] = useState("worldwide");
	const [countryData, setCountryData] = useState({});
	const [listData, setListData] = useState([]);
	const [moreCountryInfo, setMoreCountryInfo] = useState([]);
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
					const sortedData = dataSorting(data);
					setListData(sortedData);
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
				setMoreCountryInfo(data.countryInfo);
				setCountryData(data);
			});
	};

	return (
		<div className='app'>
			<div className='app__left'>
				<div className='header__body'>
					{/* Header */}
					<h1 className='app__title'>
						Covid-19 Tracker
						<a
							href='https://github.com/sohamtamboli/react-covid-19-tracker'
							rel='noreferrer'
							target='_blank'>
							<sup>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='34'
									height='34'
									viewBox='0 0 24 24'
									fill='#fff'>
									<path
										fill-rule='evenodd'
										clip-rule='evenodd'
										d='M12.026,2c-5.509,0-9.974,4.465-9.974,9.974c0,4.406,2.857,8.145,6.821,9.465 c0.499,0.09,0.679-0.217,0.679-0.481c0-0.237-0.008-0.865-0.011-1.696c-2.775,0.602-3.361-1.338-3.361-1.338 c-0.452-1.152-1.107-1.459-1.107-1.459c-0.905-0.619,0.069-0.605,0.069-0.605c1.002,0.07,1.527,1.028,1.527,1.028 c0.89,1.524,2.336,1.084,2.902,0.829c0.091-0.645,0.351-1.085,0.635-1.334c-2.214-0.251-4.542-1.107-4.542-4.93 c0-1.087,0.389-1.979,1.024-2.675c-0.101-0.253-0.446-1.268,0.099-2.64c0,0,0.837-0.269,2.742,1.021 c0.798-0.221,1.649-0.332,2.496-0.336c0.849,0.004,1.701,0.115,2.496,0.336c1.906-1.291,2.742-1.021,2.742-1.021 c0.545,1.372,0.203,2.387,0.099,2.64c0.64,0.696,1.024,1.587,1.024,2.675c0,3.833-2.33,4.675-4.552,4.922 c0.355,0.308,0.675,0.916,0.675,1.846c0,1.334-0.012,2.41-0.012,2.737c0,0.267,0.178,0.577,0.687,0.479 C19.146,20.115,22,16.379,22,11.974C22,6.465,17.535,2,12.026,2z'></path>
								</svg>
							</sup>
						</a>
					</h1>
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
						title={"Covid-19 Cases"}
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
			<div className='app__right'>
				<Card>
					{singleCountry === "worldwide" ? (
						<AllCountries tableData={listData} />
					) : (
						<SingleCountry
							cardData={countryData}
							moreCardData={moreCountryInfo}
						/>
					)}
				</Card>
			</div>
		</div>
	);
}

export default App;
