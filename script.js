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
    for (let i = 0; i < allPokemons.length; i++) {
        let pokemon = allPokemons[i];
        let button2 = `<button id="btn-icon-button" class="type-btn"><img id="cardImgHeder" class="type-img" src="./assets/pics/${pokemon.types.length == 1 ? "" : pokemon.types[1].type.name}.png" alt="${pokemon.name}"></button>`;
        let typeName1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
        if (pokemon.types.length > 1) {
            let typeName2 = pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1);
        }
        document.getElementById("pokemons").innerHTML += getPokemonCard(pokemon, i, button2);
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
    const search = inputValue.value.trim().toLowerCase();
    if (search === "") {
        renderAllPokemons();
        return;
    }

    const filtered = allPokemons.filter(p => 
        p.name.toLowerCase().includes(search) || p.id.toString().includes(search)
    );
    
    renderPokemons(filtered);
}

function renderPokemons(pokemons) {
    document.getElementById("pokemons").innerHTML = "";
    
    if (pokemons.length > 0) {
        pokemons.forEach((pokemon) => {
            const originalIndex = allPokemons.indexOf(pokemon);
            const button2 = `<button id="btn-icon-button" class="type-btn"><img id="cardImgHeder" class="type-img" src="./assets/pics/${pokemon.types.length === 1 ? "" : pokemon.types[1].type.name}.png" alt="${pokemon.name}"></button>`;
            document.getElementById("pokemons").innerHTML += getPokemonCard(pokemon, originalIndex, button2);
        });
    } else {
        document.getElementById("pokemons").innerHTML = getNotPokemon();
        setTimeout(() => {
            renderAllPokemons();
            inputValue.value = "";
        }, 2000);
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
    document.getElementById("pokemons").innerHTML = "";
    offset += 20;
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    await pokemonCard();
}
