import React, { useState } from "react";
import "./App.scss";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function App() {
	const [age, setAge] = useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};
	return (
		<div className='app'>
			<div className='app__body'>
				<h1 className='app__title'>Covid-19 Tracker</h1>
				<div className='app__country--selector'>
					<FormControl variant='filled'>
						<Select
							id='demo-simple-select-filled'
							className='selector__container'
							value={age}
							onChange={handleChange}>
							<MenuItem value='World'>
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>
		</div>
	);
}

export default App;
