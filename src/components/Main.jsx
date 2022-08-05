import React, { useEffect, useState } from 'react'
import Cards  from './Cards';
import Pokeinfo from './Pokeinfo'
import axios from 'axios';
import Select from 'react-select';
import capitalizeFirstLetter from './CapitalizerFirst';

const Main = () => {

    //Declaración de variables de estado

    const [pokeData,setPokeData] = useState([])
    const [loading,setLoading] = useState(true)
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState()
    const urlTipos ="https://pokeapi.co/api/v2/type/"
    const [pokeTypes, setPokeTypes] = useState([])



    //Función buscar tipos de pokemon

    const getTypes = async () => {
        let res = await axios.get(urlTipos)
        const pokeTypes = res.data.results
        const pokeTypeData = pokeTypes.map(item => ({
            value: item.url, 
            label: capitalizeFirstLetter(item.name)
        }))
        
        setPokeTypes(pokeTypeData)
        
    }

    

    // Funcion Mostrar Pokemons

    const pokeMostrar = async () =>{
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
        pokeMostrar()
    }, [url])

    useEffect(() => {
        getTypes()
    }, [])


    return(
        <>
            <div className='navbar'>
                <a href="/"><img className="logo-poke-api" src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' alt='Logo-PokeApi'/></a>
                <Select className="select" options={pokeTypes} onChange={ async event => {
                    
                    //Accediendo a los pokemones nuevamente, pero esta vez a través de los tipos
                    const res = await axios.get(event.value)
                    const listPokeTypes = res.data.pokemon.map((objPokemon) => objPokemon.pokemon)
                   
                    getPokemon(listPokeTypes)
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

                    <Cards pokemons={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                    
                </div>
                <div className="right-content">
                    <Pokeinfo data={pokeDex}/>

                </div>
            </div>
          
        </>
    )
}

export default Main;