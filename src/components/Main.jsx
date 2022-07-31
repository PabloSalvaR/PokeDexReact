import React, { useEffect, useState } from 'react'
import Card  from './Card';
import Pokeinfo from './Pokeinfo'
import axios from 'axios';
import Select from 'react-select';

const Main = () => {
    const [pokeData,setPokeData] = useState([])
    const [loading,setLoading] = useState(true)
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState()
    const url2 ="https://pokeapi.co/api/v2/type/"
    

    //Por tipos
    const getTypes = async () => {
        let res = await axios.get(url2)
        const pokeTypes = res.data.results
        console.log(pokeTypes)
    }



    // General y Pokemones

    const pokeFunction = async () =>{
        setLoading(true)
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
    
    }

    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result= await axios.get(item.url)

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
            <Select className="navbar" options={pokeTypes} />

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