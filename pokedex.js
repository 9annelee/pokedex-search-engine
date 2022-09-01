const form = document.querySelector("#searchForm");
const section = document.querySelector("#info");

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value.toLowerCase();
    try {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}/`);
    } catch (e) {
        alert("Sorry! That's not a Pokemon!");
        form.elements.query.value = "";
    }
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}/`);
    console.log(res.data);
    makeImage(res.data);
    form.elements.query.value = "";
    makeDescription(res.data);
})

const makeImage = (pokemon) => {
    const name = pokemon.name.toUpperCase(); //STRING
    const div = document.createElement('DIV');
    // const img = document.createElement('IMG');
    const sprite = pokemon.sprites.front_default;
    // img.stylewidth = '350px';
    // img.style.height = '350px';
    // img.src = sprite;
    clearSection(section);
    div.innerHTML += 
    `<div class="card">
        <div id="result" class="column is-full">
            <header class="card-header has-background-danger-light">
                <p class="card-header-title title is-1">
                    <b>${name}</b>
                </p>
            </header>
            <img src=${sprite} width="350" height="350">
        </div>`;
    section.append(div);
}

const makeDescription = (pokemon) => {
    const result = document.querySelector('#result');
    const descriptions = document.createElement('DIV');
    const type = makeTypes(pokemon.types); //STRING OF ARRAY
    const abilities = makeAbilities(pokemon.abilities); //STRING OF ARRAY
    const baseEXP = pokemon.base_experience;
    const weight = (pokemon.weight) / 10; //INT
    const height = (pokemon.height) / 10; //INT

    descriptions.innerHTML += 
    `<div class="box has-background-danger-light is-size-5">
        <p>Type(s): ${type}</p>
        <p>Abilities: ${abilities}</p>
        <p>Base EXP: ${baseEXP}</p>
        <p>Weight: ${weight} kg</p>
        <p>Height: ${height} m</p>
    </div>
    </div>`;
    
    result.append(descriptions);
}

const makeAbilities = (pokemon_abilities) => {
    let abilities = "";

    for (let i = 0; i < pokemon_abilities.length; i++) {
        if (i === 0) {
            abilities += `${pokemon_abilities[i].ability.name.toUpperCase()}`;
        } else {
            abilities += `, ${pokemon_abilities[i].ability.name.toUpperCase()}`;
        }
    }
    return abilities;
}
const makeTypes = (pokemon_types) => {
    let types = "";

    for (let i = 0; i < pokemon_types.length; i++) {
        if (i === 0) {
            types += `${pokemon_types[i].type.name.toUpperCase()}`;
        } else {
            types += `, ${pokemon_types[i].type.name.toUpperCase()}`;
        }
    }
    return types;
}

const clearSection = (element) => {
    if (element) {
        while (section.firstChild) {
            section.removeChild(section.firstChild);
        }
    }
}