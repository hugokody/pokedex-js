const pokemonList = document.getElementById('pokemonList')
const loadMoreButoon = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 5
let offset = 0;


function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>


                        <ol class="stats">STATUS: ${pokemon.stats.map((stat) => `<li class="stat ${stat}">${stat}`).join("")}
                        </ol>

                    
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                
                    </div>    
                </li>  
                `      
            ).join('')
            pokemonList.innerHTML += newHtml

        })        
}

pokeApi.getPokemons().then((pokemons = []) => {

    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML = newHtml
})


loadPokemonItens(offset, limit)

loadMoreButoon.addEventListener('click', () => {
    offset +=limit

    const qtdRecordWithNextPage = offset + limit

    if(qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)  
        
        loadMoreButoon.parentElement.removeChild(loadMoreButoon)
    }
    else {
        loadPokemonItens(offset, limit)

    }

    


})