const listPokemon = document.querySelector("#list-pokemons");
let url_API = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(url_API + i)
    .then((response) => response.json())
    .then((data) => showPokemon(data));
}

function showPokemon(Poke) {
  let types = Poke.types.map(
    (type) => `<p class="${type.type.name} type">${type.type.name}</p>`
  );
  types = types.join("");

  let PokeId = Poke.id.toString();
  if (PokeId.length === 1) {
    PokeId = "00" + PokeId;
  } else if (PokeId.length === 2) {
    PokeId = "0" + PokeId;
  }

  const $div = document.createElement("div");
  $div.classList.add("pokemon");
  $div.innerHTML = `    
    <p class="pokemon-id-back">#${PokeId}</p>
    <div class="pokemon-image">
        <img src="${Poke.sprites.other["home"].front_shiny}" alt="${Poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="name-container">
            <p class="pokemon-id">#${PokeId}</p>
            <h2 class="pokemon-name">${Poke.name}</h2>
        </div>
        <div class="pokemon-type">
            ${types}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${Poke.height}M</p>
            <p class="stat">${Poke.weight}KG</p>
        </div>
    </div>
    `;
  listPokemon.append($div);
}

const buttonsHeader = document.querySelectorAll(".btn-header");
buttonsHeader.forEach((button) => button.addEventListener("click", (event) => {
    const buttonId = event.target.id;
    listPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(url_API + i)
            .then((response) => response.json())
            .then((data) => {
                if (buttonId === "show-all") {
                    showPokemon(data);
                } else {
                    const pokeTypes = data.types.map(type => type.type.name);
                    if (pokeTypes.some(type => type.includes(buttonId))) {
                        showPokemon(data)
                    }
                }
            })
    }
}))
