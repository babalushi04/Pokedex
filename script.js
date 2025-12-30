let limit = 20;
let offset = 0;

// FEHLER 1: Template-String-Syntax war falsch (fehlende Backticks)
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

let pokedexCard = [];
let allPokemons = [];

let inputValue = document.getElementById("searchInput");
let dialogCard = document.getElementById("dialogCard");
let dialogClose = document.getElementById("dialogClose");   

async function init() {
    // FEHLER 2: Funktionsname war falsch (pokedexCard ist ein Array, nicht eine Funktion)
    await pokemonCard();    
}

async function loadPokedex() {
  try {
    const response = await fetch(BASE_URL);
    let responseData = await response.json();
    // FEHLER 3: Rückgabe der Daten hinzugefügt und globale Variable korrekt gesetzt
    pokedexCard = responseData.results;
    return pokedexCard;
  } catch (error) {
    console.error(error);
  }
}

// FEHLER 4: Typo im Funktionsnamen korrigiert (pokomeonData -> pokemonData)
async function pokemonData() {
  showLoader();
  try {
    await loadPokedex();
    for (let i = 0; i < pokedexCard.length; i++) {
      let response = await fetch(pokedexCard[i].url);
      let singledata = await response.json();
      allPokemons.push(singledata);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

async function pokemonCard() {
  // FEHLER 5: Funktionsname korrigiert
  await pokemonData();
  for (let i = 0; i < allPokemons.length; i++) {
    let pokemon = allPokemons[i];
    let button2 = `<button id="btn-icon-button" class="type-btn"><img id="cardImgHeder" class="type-img" src="./image/icons/${pokemon.types.length == 1 ? "" : pokemon.types[1].type.name}.png" alt="${pokemon.name}"></button>`;
    // FEHLER 6: Die Typ-Namen wurden nicht verwendet/gespeichert
    let typeName1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
    if (pokemon.types.length > 1) {
      let typeName2 = pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1);
    }
    document.getElementById("pocemons").innerHTML += getPokemonCard(pokemon, i, button2);
  }
}

async function cardDialog(i) {
  let pokemon = allPokemons[i];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon, i, pokemon);
  await aboutCardPokemon(i);
  dialogCard.showModal();
}

async function aboutCardPokemon(i) {
  let pokemon = allPokemons[i];
  document.getElementById("card-body-content").innerHTML = getAboutCardDialog(pokemon, pokemon);
}

async function baseStatCardPokemon(i) {
  let pokemon = allPokemons[i];
  document.getElementById("card-body-content").innerHTML = getBaseStatCardDialog(pokemon, i);
}

async function shinyCardPokemon(i) {
  let pokemon = allPokemons[i];
  try {
    let speciURL = await fetch(pokemon.species.url);
    let pokemon2 = await speciURL.json();
    document.getElementById("card-body-content").innerHTML = getShinyCardDialog(pokemon, pokemon2);
  } catch (error) {
    console.log(error);
  }
}

async function evoCardPokemon(i) {
  let pokemon = allPokemons[i];
  try {
    let currentURL = await fetch(pokemon.species.url);
    let pokemon3 = await currentURL.json();
    let evolutionURL = await fetch(pokemon3.evolution_chain.url);
    let pokemon4 = await evolutionURL.json();
    document.getElementById("card-body-content").innerHTML = getEvoCardDialog(pokemon4);
  } catch (error) {
    console.log(error);
  }
}

async function inputSearchPokemon() {
  // FEHLER 7: Typo in Variable (allPokemmons -> allPokemons)
  for (let i = 0; i < allPokemons.length; i++) {
    let pokemon = allPokemons[i];
    let button2 = `<button id="btn-icon-button" class="type-btn"><img id="cardImgHeder" class="type-img" src="./image/icons/${
      pokemon.types.length == 1 ? "" : pokemon.types[1].type.name
    }.png" alt="${pokemon.name}"></button>`;
    let search = inputValue.value.trim().toLowerCase();

    if (search == "") {
      document.getElementById("pocemons").innerHTML = getNotPokemon(pokemon, i);
    }

    // FEHLER 8: Vergleich sollte auch lowercase sein
    if (search == pokemon.id.toString() || search == pokemon.name.toLowerCase()) {
      document.getElementById("pocemons").innerHTML = getPokemonCard(pokemon, i, button2);
    }
  }
}

async function showLeft(i) {
  let currentIndex = (i - 1 + allPokemons.length) % allPokemons.length;
  let pokemon = allPokemons[currentIndex];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon, currentIndex);
  // FEHLER 9: Index sollte currentIndex sein
  await aboutCardPokemon(currentIndex);
}

async function showlRight(i) {
  let currentIndex = (i + 1) % allPokemons.length;
  let pokemon = allPokemons[currentIndex];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon, currentIndex);
  // FEHLER 10: Index sollte currentIndex sein
  await aboutCardPokemon(currentIndex);
}

async function morePocemon() {
  document.getElementById("pocemons").innerHTML = "";
  offset += 20;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  await pokemonCard();
}
