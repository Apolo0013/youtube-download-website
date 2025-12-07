import { createContext } from "react";

export type GlobalContextType = {
    UrlFornecida: boolean,
    StreamFornecida: boolean
}

export const GlobalContext = createContext<GlobalContextType | null>(null)