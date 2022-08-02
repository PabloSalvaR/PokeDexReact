import React from 'react'
import capitalizeFirstLetter from './CapitalizerFirst'

const Card = ({pokemons, loading, infoPokemon}) => {
    
  return (
        <>
        {
            loading ? <h1>Loading...</h1> :
            pokemons.map((pokemon)=> {
                return (
                    
                    <div className="card" key={pokemon.id} onClick={() => infoPokemon(pokemon)}>
                        <h2>#{pokemon.id}</h2>
                        <img src={pokemon.sprites.front_default} alt="" />
                        <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
                    </div>                 
            
                )
            })
        }
        </>
    )
}

export default Card;