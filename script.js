
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
    const el = document.getElementById("pokemons");
    el.innerHTML = "";

    for (let i = 0; i < allPokemons.length; i++) {
        const p = allPokemons[i];
        const type2 = p.types[1]?.type?.name ?? "";
        const btn = `<button id="btn-icon-button" class="type-btn">
      <img id="cardImgHeder" class="type-img" src="./assets/pics/${type2}.png" alt="${p.name}">
    </button>`;
        el.innerHTML += getPokemonCard(p, i, btn);
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
    const search = inputValue.value.trim().toLowerCase();
    const pokemonContainer = document.getElementById("pokemons");

    if (search === "") {
        renderAllPokemons();
        return;
    }

    const foundPokemons = allPokemons.filter(pokemon => {
        const nameMatches = pokemon.name.toLowerCase().includes(search);
        const idMatches = String(pokemon.id).includes(search);
        return nameMatches || idMatches;
    });

    if (foundPokemons.length === 0) {
        pokemonContainer.innerHTML = getNotPokemon();
        return;
    }

    pokemonContainer.innerHTML = "";
    foundPokemons.forEach(pokemon => {
        const index = allPokemons.indexOf(pokemon);
        const secondType = pokemon.types[1]?.type?.name ?? "";
        const typeButton = `<button id="btn-icon-button" class="type-btn">
      <img id="cardImgHeder" class="type-img" src="./assets/pics/${secondType}.png" alt="${pokemon.name}">
    </button>`;
        pokemonContainer.innerHTML += getPokemonCard(pokemon, index, typeButton);
    });
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
    try {
        offset += limit;
        await pokemonCard();
    } finally {
        hideSplash();
    }
}

function showSplash() {
    document.getElementById("splash")?.setAttribute("aria-busy", "true");
}

function hideSplash() {
    document.getElementById("splash")?.setAttribute("aria-busy", "false");
}


