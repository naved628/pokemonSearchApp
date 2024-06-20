"use client";

import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon, fetchTypes, setSelectedType, setSearchTerm } from './slices/pokemonSlice';
import Link from 'next/link';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const { filteredPokemon, types } = useSelector(state => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemon());
    dispatch(fetchTypes());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <form className="mb-6 flex space-x-4 items-center">
        <select className="border p-2 rounded-md" onChange={(e) => dispatch(setSelectedType(e.target.value))}>
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type?.name} value={type?.name}>{type?.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search Pokémon"
          className="border p-2 rounded-md flex-1"
          onChange={(e) => dispatch(setSearchTerm(e.target.value.toLowerCase()))}
        />
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((p) => (
          <PokemonCard key={p?.name} pokemon={p} />
        ))}
      </div>
    </div>
  );
};

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="border p-4 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <Link href={`/pokemon/${pokemon?.name}`}>
          <h2 className="text-xl font-bold capitalize">{pokemon?.name}</h2>
      </Link>
    </div>
  );
};

export default Home;
