import { useContext } from "react";
import { GlobalContext, type GlobalContextType } from "./ContextGlobal";

function ProviderContext({ children }: {children: React.ReactNode}) {
    return (
        <GlobalContext.Provider value={{
            UrlFornecida: true,
            StreamFornecida: true
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function GetGlobal(): GlobalContextType | null {
    return useContext(GlobalContext)
}

export default ProviderContext

