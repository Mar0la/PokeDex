const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImg = document.querySelector('.pokemon-img')
const h3 = document.querySelectorAll('h3')
const form = document.querySelector('.form')
const input = document.querySelector('.input-search')

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if(APIResponse.status === 200) {
    const data = await APIResponse.json()
    console.log(data.types)
    return data 
  }
} 


const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = ''

  const data = await fetchPokemon(pokemon)

  if(data) {
  pokemonImg.style.display = 'block'
  pokemonName.innerHTML = data.name
  pokemonNumber.innerHTML = data.id
  pokemonImg.src = data.sprites.versions['generation-v']['black-white'].animated['front_default']
  
  input.value = ''
  searchPokemon = data.id;
  } else {
      pokemonImg.style.display = 'none'
      pokemonName.innerHTML = 'Não encontrado'
      pokemonNumber.innerHTML = ''
      input.value = ''
    }
  }


form.addEventListener('submit', (event) => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon);

// const fetchPokemon = async (pokemon) => {
//   const APIResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

//   const data =  JSON.stringify(APIResponse);

//   console.log(data)
// }
// fetchPokemon("charmander")