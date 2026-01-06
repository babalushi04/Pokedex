let limit = 20;
let offset = 0;

let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

let pokedexCard = [];
let allPokemons = [];

let inputValue = document.getElementById("search");
let dialogCard = document.getElementById("dialog-content");

async function init() {
    await pokemonCard();
}

async function loadPokedex() {
    try {
        const response = await fetch(BASE_URL);
        let responseData = await response.json();
        pokedexCard = responseData.results;
        return pokedexCard;
    } catch (error) {
        console.error(error);
    }
}

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
    const el = document.getElementById("pokemons");

    if (search === "") {
        renderAllPokemons();
        return;
    }

    const filtered = allPokemons.filter(p =>
        p.name.toLowerCase().includes(search) || String(p.id).includes(search)
    );

    if (filtered.length === 0) {
        el.innerHTML = getNotPokemon();
        return;
    }

    el.innerHTML = filtered.map(p => {
        const i = allPokemons.indexOf(p);
        const type2 = p.types[1]?.type?.name ?? "";
        const btn = `<button id="btn-icon-button" class="type-btn">
      <img id="cardImgHeder" class="type-img" src="./assets/pics/${type2}.png" alt="${p.name}">
    </button>`;
        return getPokemonCard(p, i, btn);
    }).join("");
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
    offset += limit;
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    await pokemonCard();
}



