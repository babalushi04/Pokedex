
function getPokemonCard(pokemon, i, button2) {
  return `
  <article onclick="cardDialog(${i})" class="card card-hover mb-3 ${pokemon.types[0].type.name}" style="width: 18rem;">
    <div class="card-header">
      <h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
      <img class="cardImgHeader" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <span class="card-id">#${pokemon.id}</span>
    </div>

    <div class="card-footer">
      <button type="button" class="type-btn ${pokemon.types[0].type.name}">
        <img class="type-img"
          src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${pokemon.types[0].type.name}.svg"
          alt="${pokemon.types[0].type.name}">
      </button>
      ${pokemon.types.length === 1 ? "" : button2}
    </div>
  </article>`;
}

function getNotPokemon() {
  return `<p>Kein Eintrag gefunden!</p>`
}

function getPokemonCardDialog(pokemon, currentIndex) {
  return `<article class="card mb-3 ${pokemon.types[0].type.name}">
            <div class="card-header">
              <h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
              <img class="cardImgHeader" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}" style="width:140px; height:140px">
              <p class="card-id">#${pokemon.id}</p>
            </div>
            <nav class="link-content">
              <a href="#" onclick="aboutCardPokemon(${currentIndex}); return false;" class="card-link">About</a>
              <a href="#" onclick="baseStatCardPokemon(${currentIndex}); return false;" class="card-link">Base Stats</a>
              <a href="#" onclick="shinyCardPokemon(${currentIndex}); return false;" class="card-link">Shiny</a>
              <a href="#" onclick="evoCardPokemon(${currentIndex}); return false;" class="card-link">Evolution</a>
            </nav>
              <div id="card-body-content" class="card-body-content"></div>
            <div class="card-footer">
              <button onclick="showLeft(${currentIndex})" class="card-footer-btn">&lt;</button> <button onclick="showRight(${currentIndex})" class="card-footer-btn">&gt;</button>
                </div>
</article>`;
}

function getAboutCardDialog(specie, pokemon) {
  return `<div class="card-about-content ">
                <div class="card-details-container">
                 <p class="detail-p-headlin">Species</p><p>${pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1)}</p>
                </div>
                <div class="card-details-container">
                  <p class="detail-p-headlin">Height</p><p>${specie.height * 10} cm</p>
                </div>
                <div class="card-details-container">
                 <p class="detail-p-headlin">Weight</p><p>${specie.weight / 10} kg</p>
                </div>
                <div class="card-details-container">
                  <p class="detail-p-headlin">Base-Exp.</p><p>${pokemon.base_experience}</p> </div>
                <div class="card-details-container">
                  <p class="detail-p-headlin">Abilities</p>
                  <p>${specie.abilities[0].ability.name.charAt(0).toUpperCase() + specie.abilities[0].ability.name.slice(1)}${specie.abilities[1] !== undefined ? ", " + specie.abilities[1].ability.name.charAt(0).toUpperCase() + specie.abilities[1].ability.name.slice(1) : ""}</p>
                </div>
          </div>`;
}

function getBaseStatCardDialog(pokemon) {
  return `<div class="card-stats-content ">
  <ul>
    <li class="base-data">${pokemon.stats[0].stat.name.charAt(0).toUpperCase() + pokemon.stats[0].stat.name.slice(1)}</li> 
    <li class="base-data">${pokemon.stats[1].stat.name.charAt(0).toUpperCase() + pokemon.stats[1].stat.name.slice(1)}</li>
    <li class="base-data">${pokemon.stats[2].stat.name.charAt(0).toUpperCase() + pokemon.stats[2].stat.name.slice(1)}</li> 
    <li class="base-data">${pokemon.stats[3].stat.name.charAt(0).toUpperCase() + pokemon.stats[3].stat.name.slice(1)}</li> 
    <li class="base-data">${pokemon.stats[4].stat.name.charAt(0).toUpperCase() + pokemon.stats[4].stat.name.slice(1)}</li> 
    <li class="base-data">${pokemon.stats[5].stat.name.charAt(0).toUpperCase() + pokemon.stats[5].stat.name.slice(1)}</li> 
  </ul>
  <div class="progress-content">
    <div class="progress" role="progressbar" aria-label="${pokemon.stats[0].stat.name}" aria-valuenow="${pokemon.stats[0].base_stat}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped" style="width: ${pokemon.stats[0].base_stat}%">${pokemon.stats[0].base_stat}%</div>
    </div>
    <div class="progress" role="progressbar" aria-label="${pokemon.stats[1].stat.name}" aria-valuenow="${pokemon.stats[1].base_stat}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-success" style="width: ${pokemon.stats[1].base_stat}%">${pokemon.stats[1].base_stat}%</div>
    </div>
    <div class="progress" role="progressbar" aria-label="${pokemon.stats[2].stat.name}" aria-valuenow="${pokemon.stats[2].base_stat}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-info" style="width:${pokemon.stats[2].base_stat}%">${pokemon.stats[2].base_stat}%</div>
    </div>
    <div class="progress" role="progressbar" aria-label="${pokemon.stats[3].stat.name}" aria-valuenow="${pokemon.stats[3].base_stat}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-warning" style="width: ${pokemon.stats[3].base_stat}%">${pokemon.stats[3].base_stat}%</div>
    </div>
    <div class="progress" role="progressbar" aria-label="${pokemon.stats[4].stat.name}" aria-valuenow="${pokemon.stats[4].base_stat}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-danger" style="width: ${pokemon.stats[4].base_stat}%">${pokemon.stats[4].base_stat}%</div>
    </div>
    <div class="progress" role="progressbar" aria-label="${pokemon.stats[5].stat.name}" aria-valuenow="${pokemon.stats[5].base_stat}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-danger" style="width: ${pokemon.stats[5].base_stat}%">${pokemon.stats[5].base_stat}%</div>
    </div>
  </div>
</div>`;
}

function getShinyCardDialog(pokemon, pokemon2) {
  return `<div class="card-shiny-content">
  <img class="cardImgHeader" src="${pokemon.sprites.front_shiny}" alt="${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}" style="width:140px; height:140px">
  <span>${pokemon.past_abilities && pokemon.past_abilities[0] ? pokemon.past_abilities[0].generation.name.charAt(0).toUpperCase() + pokemon.past_abilities[0].generation.name.slice(1) : ""}</span>
  <p>${pokemon2 && pokemon2.flavor_text_entries && pokemon2.flavor_text_entries[58] ? pokemon2.flavor_text_entries[58].flavor_text : ""}</p>
  </div>`;
}

function getEvoCardDialog(pokemon4) {
  return `<div class="card-evo-content">
  <span>${pokemon4.chain && pokemon4.chain.species && pokemon4.chain.species.name ? pokemon4.chain.species.name.charAt(0).toUpperCase() + pokemon4.chain.species.name.slice(1) : ""} ${pokemon4.chain && pokemon4.chain.evolves_to && pokemon4.chain.evolves_to[0] ? ">" : ""}</span><span>${pokemon4.chain && pokemon4.chain.evolves_to && pokemon4.chain.evolves_to[0] && pokemon4.chain.evolves_to[0].species && pokemon4.chain.evolves_to[0].species.name ? pokemon4.chain.evolves_to[0].species.name.charAt(0).toUpperCase() + pokemon4.chain.evolves_to[0].species.name.slice(1) : ""} ${pokemon4.chain && pokemon4.chain.evolves_to && pokemon4.chain.evolves_to[0] && pokemon4.chain.evolves_to[0].evolves_to && pokemon4.chain.evolves_to[0].evolves_to[0] ? ">" : ""}</span> <span>${pokemon4.chain && pokemon4.chain.evolves_to && pokemon4.chain.evolves_to[0] && pokemon4.chain.evolves_to[0].evolves_to && pokemon4.chain.evolves_to[0].evolves_to[0] && pokemon4.chain.evolves_to[0].evolves_to[0].species && pokemon4.chain.evolves_to[0].evolves_to[0].species.name ? pokemon4.chain.evolves_to[0].evolves_to[0].species.name.charAt(0).toUpperCase() + pokemon4.chain.evolves_to[0].evolves_to[0].species.name.slice(1) : ""}</span>
  </div>`;
}

