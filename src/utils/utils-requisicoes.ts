//Arquivo que vai guardar as funcoes que fazem as requisoca

import type { BodyAbaixaStream, GetOpcaoType } from "../type"
import { sleep } from "./utils"

//Ele vai fazer o servico de verificar se esta tudo dboa com url fornecida
export async function VerificarURL(url: string) {
    try {
        const req = await fetch("http://localhost:5194/VerificarURL?url=" + url, {
            method: "GET"
        })
        //Pegando a resposta
        if (req.ok) { 
            const resposta: {
                sucesso: boolean,
                motivo?: string
                valido?: boolean
            } = await req.json()
            if (resposta.sucesso && resposta.valido) return true
        }
        else return false
    }
    catch (error) {
        console.log(error)
        return false
    }
}

//requisicao que  vai retornar as opcao da url fornecida.
//type que ele vai Manda
//Manda
type StreamInfo = {
    Url: string
}
//Receber

export async function PegarStreamURL(url: string): Promise<GetOpcaoType | null>{
    try {
        //preparando o body
        const body: StreamInfo = {
            Url: url
        }
        const req = await fetch("http://localhost:5194/GetOpcao?" + "_=" + Date.now(), {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (req.ok) {
            const resposta: GetOpcaoType = await req.json()
            return resposta
        }
        return null
    }
    catch (error) {
        console.log(error)
        return null
    }
}


//Requisicao que faz contato com BacnEnd para abaixa
export async function AbaixaResquest(body: BodyAbaixaStream): Promise<boolean> {
    //ID que serar usado para indentificar o video ou audio que o usuariom esta querendo abaixa
    let ID = ""
    //E formato
    const formato = body.Formato

    try {
        const req = await fetch("http://localhost:5194/Abaixa/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        if (req.ok) {
            const conteudo: { sucesso: boolean, idjob: string } = await req.json()
            ID = conteudo.idjob
        }
    }
    catch (error) {
        console.log(error)
        return false
    }

    //agora vamos fica pedindo pro backend se tem video ou audio esta pronto
    try {
        while (true) {
            console.log('loop...')
            const req = await fetch(`http://localhost:5194/GetResultado?id=${ID}&formato=${formato}`, {
                method: "GET"
            })
            //pegando o retorno
            if (req.ok) {
                const blob: Blob = await req.blob();
                const url: string = URL.createObjectURL(blob);
                //criando o elemento (a)ncora
                const a = document.createElement("a");
                a.href = url; // dando o link pra ele
                a.download = body.Formato == 'video' ? "video.mp4" : "audio.mp3"; // nome do downnload
                a.click(); // clicando o mesmo
                URL.revokeObjectURL(url);
                return false
            }
            else {
                const conteudo: { sucesso: boolean, motivo: "FAIL" | "NOREADY" } = await req.json()
                if (conteudo.motivo == 'FAIL') {
                    //algo deu errado em converte
                    return false
                }
                else if (conteudo.motivo == "NOREADY") {
                    console.log("nao esta pronto")
                }
            }
            console.log('esperando 2s')
            //esperar 2s
            await sleep(2)
        }
    }
    catch (error) {
        console.log(error)
        return false
    }
}
