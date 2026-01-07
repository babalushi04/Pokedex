
async function loadPokedex() {
  const response = await fetch(buildPokemonListUrl());
  const data = await response.json();
  pokedexCard = data.results;
  return pokedexCard;
}

async function pokemonData() {
  await loadPokedex();
  for (let i = 0; i < pokedexCard.length; i++) {
    const res = await fetch(pokedexCard[i].url);
    const single = await res.json();

    if (!loadedIds.has(single.id)) {
      loadedIds.add(single.id);
      allPokemons.push(single);
    }
  }
}

