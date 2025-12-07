//aqui ondem nois manipular o localstorage
//Nomes da chave, que indentifca os valor dentro do localstoragem
export const LISTAHISTORICO_LS: string = "HISTORICO_DE_URL_"

export function Set(target: string, valor: unknown): boolean {
    try { localStorage.setItem(target, JSON.stringify(valor)) }
    catch { return false } // se retornou null porque algo deu errado
    return true
}

export function Get(target: string): string | null {
    const stringvalue: string | null = localStorage.getItem(target)
    if (stringvalue) {return stringvalue}
    else return null
}

/////////////////////////////////////////////////////////////////////
//                           Funcao utils ou funcao que é usada nos componens  por  questao de organizacao
//////////////////////////////////////////////////////////////////////

//type da lista de url
export type typeurlhistorico = {
    url: string,
    time: number
}

export function AddUrlLocalStorage(url: string) {
    //Add o url que ele colocou dentro de um localstorage
    const listaurlstorage: string | null = Get(LISTAHISTORICO_LS)
    const agora: number = Date.now() 
    //caso ele ja tenha valor
    if (listaurlstorage) {
        const listaurl = JSON.parse(listaurlstorage) as typeurlhistorico[] // tranformando em lista
        listaurl.push({time: agora, url: url})  // add a nova url
        Set(LISTAHISTORICO_LS, listaurl) // mandando por localstorage
    }
    //caso ele retorno null, que dizer nao tem valor la, entao vamos setar o primeiro
    else {
        const value: typeurlhistorico = {url: url, time: agora}
        Set(LISTAHISTORICO_LS, [value])
    }
}