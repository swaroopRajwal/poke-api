import axios from "axios";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

interface IProps {
  name: string,
  url: string,
  skeleton?: boolean,
}

const Pokemon = (props: IProps) => {
  const [imageNotFound, setImageNotFound] = useState(false);

  if (imageNotFound) {
    return <></>;
  }

  return(
    <div className="poke-card gap-3">
      <div 
        className="jugaad"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.url.split("/")[6]}.png`} 
          className="h-full w-full"
          onError={() => setImageNotFound(true)}
          alt=" " 
        />
      </div>
      <p className="text-gray-400 text-lg capitalize">{props.name}</p>
    </div>
  )
}
export default Pokemon;