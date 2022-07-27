import { useInfiniteQuery } from '@tanstack/react-query';
import type { NextPage } from 'next'
import React, { useContext, useEffect, useState } from 'react';
import pokeapi from '../lib/pokeapi'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../components/PokeCad/Loader';
import PokeCard from '../components/PokeCad';
import { setgroups } from 'process';
import { useRouter } from 'next/router';
import IdContext from '../lib/context/IdContext';

const limit = 50;

const fetchPokemon = async (url: string) => {
  const response = await pokeapi.get(url);
  return response.data;
}

const Home: NextPage = () => {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["pokemons"], 
    async ({pageParam=`pokemon?limit=${limit}&offset=0`}) => fetchPokemon(pageParam),
    {
      getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
      getNextPageParam: (nextPage) => nextPage.next ?? undefined,
    }
  )

  const { id } = useContext(IdContext);

  useEffect(() => {
    if(id) {
      // if(document.getElementById(`${id}`)) {
      document.getElementById(`${id}`)?.scrollIntoView({behavior: 'auto'});
      // }
    }
  }, [id])

  // * The jsx part begins
  if(status === "error") {
    return <p>Error!!!</p>
  }
  
  return (
    <>
      <p className='title text-cyellow'>Pokemons</p>
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
                <PokeCard {...pokemon} key={i}/>
              ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
      {status === "loading" || hasNextPage && <Loader/>}
    </>
  )
}

export default Home;
