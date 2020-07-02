import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from './Results';
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';

const SearchParams = () => {
	
	const [location, setLocation] = useState("Seattle, WA"); //this is a hook
	//location is the default location set to settle. setlocation updates location
	//line 9 displays location on the webpage.
	//hooks never go in an if statment or for loop

	const [breeds, setBreeds] = useState([]); //this array is constantly changing depending on what the user is selecting 
	const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
	const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
	const [pets, setPets] = useState([]);
	const [theme, setTheme] = useContext(ThemeContext); //using theme to design content
	 
	async function requestPets() { //async function always returns a promice when the function completes
		const { animals } = await pet.animals({ // await says wait here on pet.animals line till this function completes and then give me data
			location,
			breed,
			type: animal
		})

		setPets(animals || []); //setPets to whatever is in animals or an empty array
    }

	useEffect(() => { //useEffect is scheduling to run after the webpage rendering happnes
		setBreeds([]);
		setBreed("");

		pet.breeds(animal).then(({ breeds: apiBreeds }) => {
			const breedStrings = apiBreeds.map(({ name }) => name);
			setBreeds(breedStrings);
		}, console.error);
	}, [animal,setBreed, setBreeds]); //this function will only run when these things are changed/affected 

	return (
		<div className="search-params">
			<h1> {location} </h1>
			<form onSubmit={(e) => {
				e.preventDefault(); //this will prevent it from submiting a html form post
				requestPets(); //get the pet selected based on user choise 
			}}>
				<label htmlFor="location">
					Location
					<input
						id="location"
						value={location}
						placeholder="Location"
						onChange= {event => setLocation(event.target.value)} //event changes the location based on what's inputed
					/> 
				</label>

				<AnimalDropdown />
				<BreedDropdown />
				<label htmlFor="theme">
					Theme
					<select
						value={theme}
						onChange={e => setTheme(e.target.value)}
						onblur={e => setTheme(e.target.value)}
					>
						<option value="peru"> Peru </option>
						<option value="darkblue"> Dark Blue </option>
						<option value="mediumorchid"> Medium Orchid </option>
						<option value="lightgreen"> Light Green </option>
					</select>
				</label>
				<button style={{ backgroundColor: theme }}> Submit </button>
			</form>
			<Results pets={pets} />
		</div>
	);
};

// animal and breed dropdown are using shared generic class or hook 
export default SearchParams;

