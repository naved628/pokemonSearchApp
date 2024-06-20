import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
      const results = response.data.results;

      // Fetch detailed data for each Pokémon
      const detailedPromises = results.map(p => axios.get(p.url));
      const detailedResponses = await Promise.all(detailedPromises);

      const detailedPokemon = detailedResponses.map(res => res.data);
      setPokemon(detailedPokemon);
    };
    fetchPokemon();
  }, []);

  const handleTypeChange = (e) => setSelectedType(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredPokemon = pokemon.filter(p =>
    p.name.includes(searchTerm) &&
    (selectedType === '' || p.types.some(type => type.type.name === selectedType))
  );

  return {
    pokemon: filteredPokemon,
    handleTypeChange,
    handleSearchChange,
    selectedType,
    searchTerm,
  };
};
