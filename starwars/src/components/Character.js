// Write your Character component here
import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";

/* data available from character:
name string -- The name of this person.
birth_year string -- The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.
eye_color string -- The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.
gender string -- The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
hair_color string -- The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.
height string -- The height of the person in centimeters.
mass string -- The mass of the person in kilograms.
skin_color string -- The skin color of this person.
homeworld string -- The URL of a planet resource, a planet that this person was born on or inhabits.
films array -- An array of film resource URLs that this person has been in.
species array -- An array of species resource URLs that this person belongs to.
starships array -- An array of starship resource URLs that this person has piloted.
vehicles array -- An array of vehicle resource URLs that this person has piloted.
url string -- the hypermedia URL of this resource.
created string -- the ISO 8601 date format of the time that this resource was created.
edited string -- the ISO 8601 date format of the time that this resource was edited.
*/

const StyledCharacter = styled.div`
  box-sizing: border-box;
  width: 49%;
  margin-bottom: 2.5%;
  padding: 2%;

  border: 1px solid ${props => props.theme.highlightColor};
  border-radius: 1rem;

  background-color: ${props => props.theme.backgroundColor};

  h2{
    margin: 0;
    padding: 0;
    font-size: 2.4rem;
    text-align: center;
    color: ${props => props.theme.headTextColor};
  }
`;

const Character = (props) => {
    const {character} = props;

    const [species, setSpecies] = useState("");
    const [homeworld, setHomeworld] = useState("");

    useEffect(() => {
        // the character's homeworld and species are stored as API calls
        // so call them and store the results
        if(character.homeworld !== ""){
            axios.get(character.homeworld)
            .then(result => setHomeworld(result.data.name)) // store the name of the planet
            .catch(error => console.log(error))
        }
        if(character.species.length > 0){
            axios.get(character.species[0]) // species is a list of calls; don't ask me why
            .then(result => setSpecies(result.data.name)) // store the name of the species
            .catch(error => console.log(error))
        }
        else{ // for some reason, human characters have no species set in the API
            setSpecies("human");
        }
    }, []); // only on initialization

    return(
        <StyledCharacter>
            <h2>{character.name}</h2>
            {
            character.gender !== "n/a" ? // if this character has a gender...
            <div>{character.gender.toLowerCase()} {species}</div> : // print it and their species
            <div>{species}</div> // otherwise, just species
            }
            <div>Born: {character.birth_year}, {homeworld}</div>
            <div>Height: {character.height} cm</div>
            <div>Weight: {character.mass} kg</div>
            <div>Skin: {character.skin_color}</div>
            {
            character.hair_color !== "n/a" &&
            <div>Hair: {character.hair_color}</div>
            }
            <div>Eyes: {character.eye_color}</div>
        </StyledCharacter>
    );
};

export default Character;