
let inputValue;
let dialogCard;

async function init() {
    inputValue = document.getElementById("search");
    dialogCard = document.getElementById("dialog-content");

    showSplash();
    await pokemonCard();
    hideSplash();
}

function renderAllPokemons() {
    let pokemonContainer = document.getElementById("pokemons");
    pokemonContainer.innerHTML = "";

    for (let index = 0; index < allPokemons.length; index++) {
        let pokemon = allPokemons[index];

        let secondType = pokemon.types[1]?.type?.name;
        let typeButton = getTypeButton(secondType, pokemon.name);

        pokemonContainer.innerHTML += getPokemonCard(pokemon, index, typeButton);
    }
}

async function pokemonCard() {
    await pokemonData();
    renderAllPokemons();
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

function inputSearchPokemon() {
    let search = getSearchValue();
    let pokemonContainer = document.getElementById("pokemons");

    if (search === "") {
        renderAllPokemons();
        return;
    }

    let foundPokemons = filterPokemons(search);

    if (foundPokemons.length === 0) {
        pokemonContainer.innerHTML = getNotPokemon();
        return;
    }

    renderFoundPokemons(foundPokemons, pokemonContainer);
}

function getSearchValue() {
    return inputValue.value.trim().toLowerCase();
}

function filterPokemons(search) {
    let foundPokemons = [];
    for (let i = 0; i < allPokemons.length; i++) {
        let pokemon = allPokemons[i];
        if (matchesSearch(pokemon, search)) {
            foundPokemons.push(pokemon);
        }
    }
    return foundPokemons;
}

function matchesSearch(pokemon, search) {
    let pokemonName = pokemon.name.toLowerCase();
    let pokemonId = String(pokemon.id);
    return pokemonName.includes(search) || pokemonId.includes(search);
}

function renderFoundPokemons(foundPokemons, pokemonContainer) {
    pokemonContainer.innerHTML = "";

    for (let i = 0; i < foundPokemons.length; i++) {
        let pokemon = foundPokemons[i];
        let index = allPokemons.indexOf(pokemon);

        let secondType = pokemon.types[1]?.type?.name;
        let typeButton = getTypeButton(secondType, pokemon.name);

        pokemonContainer.innerHTML += getPokemonCard(pokemon, index, typeButton);
    }
}

function getTypeButton(typeName, pokemonName) {
  if (!typeName) return "";

  return `<button class="type-btn ${typeName}" title="${typeName}">
    <img class="type-img" src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeName}.svg" alt="${pokemonName} ${typeName}">
  </button>`;
}


async function showLeft(i) {
    let currentIndex = (i - 1 + allPokemons.length) % allPokemons.length;
    let pokemon = allPokemons[currentIndex];
    document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon, currentIndex);
    await aboutCardPokemon(currentIndex);
}

async function showRight(i) {
    let currentIndex = (i + 1) % allPokemons.length;
    let pokemon = allPokemons[currentIndex];
    document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon, currentIndex);
    await aboutCardPokemon(currentIndex);
}

async function morePokemon() {
    showSplash();
    offset += limit;
    await pokemonCard();
    hideSplash();
}

function showSplash() {
    document.getElementById("splash")?.setAttribute("aria-busy", "true");
}

function hideSplash() {
    document.getElementById("splash")?.setAttribute("aria-busy", "false");
}
