import { createContext, Dispatch, SetStateAction } from "react";

interface IIdContext {
  id: string,
  setId: Dispatch<SetStateAction<string>>,
}

const IdContext = createContext({} as IIdContext);

export default IdContext;