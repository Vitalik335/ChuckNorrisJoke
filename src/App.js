import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './App.css';
import { FaFistRaised } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

function App() {
  const [joke, setJoke] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchRandomJoke = async () => {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    setJoke(data.value);
  };

  const fetchJokeByCategory = async (category) => {
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
    const data = await response.json();
    setJoke(data.value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://api.chucknorris.io/jokes/categories');
      const data = await response.json();
      setCategories(data.map((cat) => ({ value: cat, label: cat })));
    };
    fetchCategories();
  }, []);

  return (
    <div className="app">
      <h1>Chuck Norris Jokes</h1>
      
      <button onClick={fetchRandomJoke} className="random-joke-button">
        Get a Random Joke
      </button>
      
      <div className="joke-display">
        <p>{joke || "Ready for a legendary Chuck Norris joke? Click above!"}</p>
      </div>

      <h2>Select Category</h2>
      <div className="category-select">
        <Select
          options={categories}
          placeholder="Choose a category"
          onChange={(option) => setSelectedCategory(option ? option.value : '')}
          classNamePrefix="react-select"
        />
      </div>
      
      <button 
        onClick={() => fetchJokeByCategory(selectedCategory)}
        disabled={!selectedCategory}
        className={`category-joke-button ${!selectedCategory ? 'disabled' : ''}`}
        data-tip={!selectedCategory ? 'Please choose a category first!' : ''}
      >
        <FaFistRaised />
        {selectedCategory ? 'Get Joke by Category' : 'Choose a category above'}
      </button>
      <Tooltip place="top" effect="solid" />
    </div>
  );
}

export default App;
