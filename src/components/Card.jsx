import React from 'react'
import capitalizeFirstLetter from './CapitalizerFirst'

const Card = ({pokemon, loading, infoPokemon}) => {
    
  return (
        <>
        {
            loading ? <h1>Loading...</h1> :
            pokemon.map((item)=> {
                return (
                    <>
                        <div className="carta" key={item.id} onClick={() => infoPokemon(item)}>
                            <h2>#{item.id}</h2>
                            <img src={item.sprites.front_default} alt="" />
                             <h2>{capitalizeFirstLetter(item.name)}</h2>
                         </div>                 
                    </>
                )
            })
        }
        </>
    )
}

export default Card;