import React, { useEffect, useState } from 'react'
import Card  from './Card';
import Pokeinfo from './Pokeinfo'
import axios from 'axios';
import Select from 'react-select';
import capitalizeFirstLetter from './CapitalizerFirst';

const Main = () => {
    const [pokeData,setPokeData] = useState([])
    const [loading,setLoading] = useState(true)
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState()
    const urlTipos ="https://pokeapi.co/api/v2/type/"
    const [pokeTypes, setPokeTypes] = useState([])



    //Por tipos
    const getTypes = async () => {
        let res = await axios.get(urlTipos)
        const pokeTypes = res.data.results
        const pokeTypeData = pokeTypes.map(item => ({
            value: item.url, 
            label: capitalizeFirstLetter(item.name)
        }))
        setPokeTypes(pokeTypeData)
        
    }

    

    // Funcion Pokemon Principal

    const pokeFunction = async () =>{
        setLoading(true)
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
    
    }

    // Funcion Traer Pokemones
    const getPokemon = async (pokemons) => {
        setPokeData([])
        pokemons.map(async (pokemon) => {
            const result= await axios.get(pokemon.url)

            setPokeData(state => {
                state = [...state,result.data]
                state.sort((a,b)=>a.id > b.id ? 1 : -1)
                return state;
            })  
        })
    }

    useEffect(() => {
        pokeFunction()
        getTypes()
    }, [url])


    return(
        <>
            <div className='navbar'>
                <a href="/"><img className="logo-poke-api" src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' alt='Logo-PokeApi'/></a>
                <Select className="select" options={pokeTypes} onChange={ async event => {
                    const res = await axios.get(event.value)
                    const listPokeTypes = res.data.pokemon.map((objPokemon) => objPokemon.pokemon)
                   
                    getPokemon(listPokeTypes)

                    console.log(listPokeTypes)
                    console.log(pokeData)
                    
                }
                
                } 
                />
            </div>
            <div className="contenedor">
            
                <div className="left-content">

                    <div className="btn-group">
                        { prevUrl && <button onClick={()=> {
                            setPokeData([])
                            setUrl(prevUrl)
                        }}>Previous</button>}

                        { nextUrl && <button onClick={()=> {
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}
                    </div>

                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                    
                </div>
                <div className="right-content">
                    <Pokeinfo data={pokeDex}/>

                </div>
            </div>
          
        </>
    )
}

export default Main;