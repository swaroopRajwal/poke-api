import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import pokeapi from "../../lib/pokeapi";

const fetchPokemon = async (id: string) => {
  const res = await pokeapi.get(`pokemon/${id}`)
  return res.data;
}

const Pokemon = () => {
  const { query } = useRouter()
  const id = query.id as string;
  const [imageNotFound, setImageNotFound] = useState(false);

  const { data, status } = useQuery(
    ["pokemon"],
    () => fetchPokemon(query.id as string), {
      enabled: !!id,
    }
  )
  // console.log(data)

  if(status == "loading") {
    return <p>Loading....</p>
  }

  if(status == "error") {
    return <p>Error !!!</p>
  }

  return(
    <div className="max-w-6xl self-center w-full">
      <p className="title text-cred">{data.name}</p>
      <div className="border-cgray border-x-2 border-2 rounded-md p-4 flex flex-col justify-center items-center">
        <div className="h-52 w-52">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
            // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            className="h-full w-full"
            onError={() => setImageNotFound(true)}
            alt=" " 
          />
        </div>
        <div className="bg-cgray w-full text-cyellow  rounded-sm p-4 flex flex-col">
          <p>Height- {data.height}</p>
          <p>Weight- {data.weight}</p>
          <div className="flex justify-start gap-1 items-start">
            <p>
              Type-
            </p>
            <div className="flex justify-start items-center gap-0.5 flex-wrap">
              {data.types.map((item: any) => (
                <Type 
                  key={item.slot}
                  type={item.type.name}
                />
              ))}
            </div>
          </div>
        </div>
        {/* <ul>
          <li>name: {data.name}</li>
          <li>height: {data.height}</li>
          <li>weight: {data.weight}</li>

          <li>type: 
            {data.types.map((item:any, i:number) => 
              <span key={i}>[{item.type.name}]</span>
            )}
          </li>

          <li>stats: 
              {data.stats.map((item:any, i:number) => 
                <span key={i}>[{item.stat.name}: {item.base_stat}]</span>
              )}
          </li>
        </ul> */}
      </div>
    </div>
  )
}
export default Pokemon;

// * Extra components
function Type ({type}: {type:string}) {
  return (
    <div className="bg-black text-cred px-2 py-0.5 rounded-full">{type}</div>
  )
}