let limit = 20;
let offset = 0;

let pokedexCard = [];
let allPokemons = [];

let loadedIds = new Set();

function buildPokemonListUrl() {
  return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
}