import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import pokeapi from "../../lib/pokeapi";

const fetchPokemon = async (id: string) => {
  const res = await pokeapi.get(`pokemon/${id}`)
  return res.data;
}

const Pokemon = () => {
  const { query } = useRouter()
  const id = query.id as string;

  const { data, status } = useQuery(
    ["pokemon"],
    () => fetchPokemon(query.id as string),
    {
      enabled: !!id,
    }
  )
  console.log(data)

  if(status == "loading") {
    return <p>Loading....</p>
  }

  if(status == "error") {
    return <p>Error !!!</p>
  }

  return(
    <div>
      <p>fetched pokemon successfully</p>

      <ul>
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
      </ul>
    </div>
  )
}
export default Pokemon;