import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import Character from "./components/Character";
import styled from "styled-components";
import theme from "./theme";

// App structure:
// state: character array
//   Character
//   props: character element

const USE_TEST_DATA = true;
const testLuke = { 
  "name": "Luke Skywalker", 
  "height": "172", 
  "mass": "77", 
  "hair_color": "blond", 
  "skin_color": "fair", 
  "eye_color": "blue", 
  "birth_year": "19BBY", 
  "gender": "male", 
  "homeworld": "http://swapi.dev/api/planets/1/", 
  "species": [], 
}; // excerpt from the API example response

const App = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if(USE_TEST_DATA){
      setCharacters([testLuke]);
    }
    else{
      axios.get("https://swapi.dev/api/people/")
      .then(result => {
        setCharacters(result.data.results);
      })
      .catch(error => console.log(error));
    }
  }, []);

  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      {characters.map((item, index) => 
      <Character key={index} character={item} />)}
    </div>
  );
}

export default App;
