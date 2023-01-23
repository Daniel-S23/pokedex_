// Comienzo a consumir la poke api
let url = "https://pokeapi.co/api/v2/pokemon?limit=107&offset=0";
let Pokemons = [];

const getPokeapi = async () => {
  const response = await axios.get(url);

  for (const pokemon of response.data.results) {
    const { data } = await axios.get(pokemon.url);
    const newPokemon = {
      name: pokemon.name,
      id: data.id,
      url: data.sprites.other.home.front_default,
      icon: data.sprites.versions["generation-vii"].icons.front_default,
      weight: data.weight,
      height: data.height,
      abilities: data.abilities,
      tipo: data.types,
      level: data.base_experience,
    };
    Pokemons.push(newPokemon);
  }
  console.log(Pokemons[0]);
  RenderPokemon(Pokemons[0]);
  renderPokeFooter(Pokemons);
};


// llamar los objectos

const RenderPokemon = (objetoPoke) => {
  const iconPoke = document.getElementById("iconPoke");
  const namePoke = document.getElementById("namePoke");
  const imgPoke = document.getElementById("imgPoke");
  const idPoke = document.getElementById("idPoke");
  const levelPoke = document.getElementById("levelPoke");
  const typePoke = document.getElementById("typePoke");
  const abilityPoke = document.getElementById("abilityPoke");
  const heightPoke = document.getElementById("heightPoke");
  const weightPoke = document.getElementById("weightPoke");

  iconPoke.src = objetoPoke.icon;
  imgPoke.src = objetoPoke.url;
  namePoke.textContent = objetoPoke.name;
  idPoke.textContent = objetoPoke.id;
  levelPoke.textContent = objetoPoke.level;
  typePoke.textContent = recorrotipo(objetoPoke.tipo);
  abilityPoke.textContent = reccoroHabilidad(objetoPoke.abilities);
  heightPoke.textContent = objetoPoke.height;
  weightPoke.textContent = objetoPoke.weight;
};
// search
const form = document.getElementById("formulario");
const search = document.getElementById("Search");
let searched

form.addEventListener('submit', event => {
  event.preventDefault()
  searched = Pokemons.filter(element => element.name.includes(search.value))
  RenderPokemon(searched[0])
})


const reccoroHabilidad = (array) => {
  let habilidad = "";
  array.forEach((item) => {
    habilidad += `${item.ability.name} `;
  });
  return habilidad;
};

const recorrotipo = (array) => {
  let tipo = "";
  array.forEach((item) => {
    tipo += `${item.type.name} `;
    console.log(tipo);
  });
  return tipo;
};

getPokeapi();

//Capturo la seccion donde van a ir los demas pokemones
const SecPokemons = document.getElementById("SecPokemons");

//Evento para renderizar los pokemones en el footer

const renderPokeFooter = (array) => {
  SecPokemons.innerHTML = "";
  array.forEach((pokemon) => {
    SecPokemons.innerHTML += `  <figure id="${pokemon.id}">
          <img
            src="${pokemon.url}"
            alt="pokemon"
            id="${pokemon.id}"
          />
        </figure>`;
  });
};

//hacemos el evento click de la seccion footer
SecPokemons.addEventListener("click", (event) => {
  if (event.target.localName == "img" || event.target.localName == "figure") {
    const idpokeclick = event.target.id;
    let arrayfilter = Pokemons.filter((pokemon) => pokemon.id == idpokeclick);
    RenderPokemon(arrayfilter[0]);
  }
});

