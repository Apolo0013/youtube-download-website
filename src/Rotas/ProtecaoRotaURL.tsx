import { Navigate } from "react-router-dom"
import type { GlobalContextType } from "../Context/ContextGlobal"
import { GetGlobal } from "../Context/ProviderContext"

//Esse componentes Protejera as rotas que precisa da url pra "Fuciona"
function ProtecaoRotaURL({children, target} : {children: React.ReactNode, target: "stream" | "download"}) {
    const Global: GlobalContextType | null = GetGlobal()
    if (target == 'stream')  // precisa da url selecionado
        return (<>{Global?.UrlFornecida ? children : <Navigate to={`/URL-Youtube`}/>}</>)
    //ele esta tentando acessa a rota download
    else if (target == 'download') { //precisa da url e do stream selecionado
        //ele tem o url fornecida e o stream... Voltar para o inicio...
        if (Global?.StreamFornecida && Global.UrlFornecida) return (<>{children}</>)
        //se ele tem a url fornecida e nao o stream. voltar para a rota stream.
        else if (!Global?.StreamFornecida && Global?.UrlFornecida) return (<Navigate to='/URL-Youtube/Stream' />)
        //senao ele voltar para o menu principal
        else return (<Navigate to='/URL-Youtube'/>)
    }
}

export default ProtecaoRotaURL