const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name  

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    //teste1 para puxar no base_stat, os STATUS do pokemon, ex: ataque, defesa etc..DEU CERTO, mas faltou puxar os nomes dos stats
    //aparece somente os numeros

    const stats = pokeDetail.stats.map((statsSlot) => statsSlot.base_stat)
    const [stat] = stats

    pokemon.stats = stats
    pokemon.stat = stat
    //fim do teste1

    //teste 2 para puxar os NOMES DOS STATUS do pokemon
    //const statusNomes = pokeDetail.stats.effort.map((statsNames) => statsNames.effort)
    //const [statNome] = statusNomes

    //pokemon.statusNomes = statusNomes
    //zpokemon.statNome = statNome
    


    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response)=> response.json())
        .then((convertPokeApiDetailToPokemon))

}

pokeApi.getPokemons = (offset=0, limit=5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails)=> pokemonsDetails)

}
