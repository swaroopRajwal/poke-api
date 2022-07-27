import { useRouter } from "next/router";
import { useState, useContext } from "react";
import IdContext from "../../lib/context/IdContext";

interface IProps {
  name: string,
  url: string,
}

const PokeCard = (props: IProps) => {
  const [imageNotFound, setImageNotFound] = useState(false);
  const router = useRouter();
  const { setId } = useContext(IdContext)

  const id = props.url.split("/")[6];
  const [imgUrl, setImgUrl] = useState()

  const clickHandler = (e:any) => {
    e.preventDefault();
    setId(id)
    router.push(`/pokemon/${id}`);
  }

  if (imageNotFound) {
    return <></>;
  }

  return(
    <a onClick={clickHandler} id={id}>
      <div className="poke-card gap-3">
        <div 
          className="jugaad"
        >
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
        <p className="text-gray-400 text-lg capitalize">{props.name}</p>
      </div>
    </a>
  )
}
export default PokeCard;