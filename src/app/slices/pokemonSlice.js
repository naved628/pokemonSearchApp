import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  pokemonList: [],
  filteredPokemon: [],
  types: [],
  selectedType: '',
  searchTerm: '',
};

export const fetchPokemon = createAsyncThunk('pokemon/fetchPokemon', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
  const results = response.data.results;
  const detailedPromises = results.map(p => axios.get(p.url));
  const detailedResponses = await Promise.all(detailedPromises);
  return detailedResponses.map(res => res.data);
});

export const fetchTypes = createAsyncThunk('pokemon/fetchTypes', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/type');
  return response.data.results;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSelectedType(state, action) {
      state.selectedType = action.payload;
      state.filteredPokemon = state.pokemonList.filter(p =>
        p.name.includes(state.searchTerm) &&
        (state.selectedType === '' || p.types.some(type => type.type.name === state.selectedType))
      );
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.filteredPokemon = state.pokemonList.filter(p =>
        p.name.includes(state.searchTerm) &&
        (state.selectedType === '' || p.types.some(type => type.type.name === state.selectedType))
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.pokemonList = action.payload;
        state.filteredPokemon = action.payload;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.types = action.payload;
      });
  },
});

export const { setSelectedType, setSearchTerm } = pokemonSlice.actions;

export default pokemonSlice.reducer;
