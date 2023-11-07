const pokemonsList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMore')
const limit = 12
let offset = 0
const maxRecords = 151

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		const newHtml = pokemons.map((pokemon) =>
    `
    <li class="pokemon ${pokemon.type}"> 
        <a href="#" id= "pokemonBanner" >
            <span class="number">#${pokemon.number}</span> 
            <span class="name">${pokemon.name}</span>

            <div class="datail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </a>
    </li>
    `
    ).join('')
    pokemonsList.innerHTML += newHtml
    
})

}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () =>{
    offset += limit

    const amountRecordsNextpage = offset + limit

    if(amountRecordsNextpage >= maxRecords) {
        
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItens(offset, limit)
    }

    
})