import { useRouter } from "next/router";
import { useState } from "react";

interface IProps {
  name: string,
  url: string,
  skeleton?: boolean,
}

const PokeCard = (props: IProps) => {
  const [imageNotFound, setImageNotFound] = useState(false);
  const router = useRouter();

  const id = props.url.split("/")[6];

  const clickHandler = (e:any) => {
    e.preventDefault();
    router.push(`/pokemon/${id}`)
  }

  if (imageNotFound) {
    return <></>;
  }

  return(
    <a onClick={clickHandler}>
      <div className="poke-card gap-3">
        <div 
          className="jugaad"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
            className="h-full w-full"
            onError={() => setImageNotFound(true)}
            alt=" " 
          />
        </div>
        <p className="text-gray-400 text-lg capitalize">{props.name}</p>
      </div>
    </a>
  )
}
export default PokeCard;