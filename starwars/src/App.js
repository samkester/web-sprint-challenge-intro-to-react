import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";

// App structure:
// state: character array
//   Character
//   props: character element

const App = () => {
  const [characters, setCharacters] = useState(undefined);

  useEffect(() => {
    axios.get("https://swapi.dev/api/people/")
    .then(result => {
      setCharacters(result.data.results);
    })
    .catch(error => console.log(error));
  }, []);

  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      {(characters !== undefined) && characters.map(item => <div>{item.name}</div>)}
    </div>
  );
}

export default App;
