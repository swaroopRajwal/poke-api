import { useInfiniteQuery } from '@tanstack/react-query';
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import Pokemon from '../components/Pokemon';
import pokeapi from '../lib/pokeapi'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../components/Pokemon/Loader';

const limit = 100;

const Home: NextPage = () => {

  const fetchPokemon = async (url: string) => {
    const response = await pokeapi.get(url);
    return response.data;
  }

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["pokemons"], 
    async ({pageParam=`pokemon?limit=${limit}&offset=0`}) => fetchPokemon(pageParam),
    {
      getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
      getNextPageParam: (nextPage) => nextPage.next ?? undefined,
    }
  )


  // * The jsx part begins
  if(status === "error") {
    return <p>Error!!!</p>
  }
  
  return (
    <div className='min-h-screen bg-black flex flex-col gap-6 p-5 debug-screens'>
      <p className='sigmar text-3xl text-center text-cyellow'>Pokemons</p>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchNextPage()}
        // loadMore={() => {}}
        hasMore={hasNextPage}
        className="max-w-6xl self-center w-full"
      >
        <div className='poke-grid'>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((pokemon: {name:string, url:string}, i:number) => (
                <Pokemon {...pokemon} key={i}/>
              ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
      {status === "loading" || hasNextPage && <Loader/>}
    </div>
  )
}

export default Home;
