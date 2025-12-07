import { useEffect, useRef, useState, type JSX } from 'react'
import './Abaixa.scss'
import { useLocation, useNavigate } from 'react-router-dom'
//type
import type { BodyAbaixaStream } from '../../type'
import type { GlobalContextType } from '../../Context/ContextGlobal'
import Loading from '../Loading-false/Loading-false'
import { GetGlobal } from '../../Context/ProviderContext'
//Requsicao
import { AbaixaResquest } from '../../utils/utils-requisicoes'

//Exclusivamente desse componentes, ondem ele vai exbir um aviso simples
//Ele avisa que algo deu errado em abaixa o video/audio. apenas isso.
function AvisoError({text}: {text: string}) {
    return (
        <div className="conteiner-abaixa-aviso abaixa-show-aviso">
            <p className='abaixa-aviso-text'>{text}</p>
        </div>
    )
}


//Efeito no fundo
function Effect_BackGround() {
    function AddColunas(quantidade: number = 10) {
        const ListElementos: JSX.Element[] = []
        for (let i = 0; i < quantidade; i++) {
            ListElementos.push(<span className='colunas-back up-down' style={{ animationDelay: (1000 * i) + "ms" }} key={i}></span>)
        }
        SetColunas(ListElementos)
    }

    const [StateColunas, SetColunas] = useState<JSX.Element[]>()
    useEffect(() => {
        AddColunas()
    }, [])
    return (
        <div className="conteiner-background-abaixa">
            {StateColunas}
        </div>
    )
}

//Botao de voltar para o inicio.
function BotaoBack({StateClass}: {StateClass: string}) {
    const nv = useNavigate()

    return (
        <div className={"conteiner-abaixa-area-botao-back " + StateClass}>
            <p className='abaixa-p-text'>Agora você pode voltar ao menu principal.</p>
            <button className="abaixa-btn-voltar" onClick={() => nv('/URL-Youtube')}>
                Voltar
            </button>
        </div>
    )
}

function Abaixa() {
    async function AbaixaWraper() {
        //Add o loading...
        SetLoading(<Loading />)
        //=================
        const sucesso: boolean = await AbaixaResquest(body.current)
        SetBotaoBackClass('up-move')
        if (!sucesso) SetError(<AvisoError text="Houve um erro ao baixar o seu vídeo/áudio 😕 Por favor, tente novamente mais tarde ou envie outro link 🔁"/>)
        //resentando...
        SetLoading(null) // retirado o loading false
        Global!.StreamFornecida = false // Stream para nao fornecida
        Global!.UrlFornecida = false // url para nao fornecida
    }
    //useState
    //State class para o botaoback
    const [StateBotaoBackClass, SetBotaoBackClass] = useState<string>("")
    //state para o loading-false
    const [StateLoading, SetLoading] = useState<JSX.Element | null | undefined>(null)
    //state para o aviso-eror
    const [StateError, SetError] = useState<JSX.Element | null | undefined>(null)
    //GlobalContext
    const Global: GlobalContextType | null = GetGlobal()!

    //Pegando os parametro
    const { state }: {state: BodyAbaixaStream} = useLocation()
    const body = useRef<BodyAbaixaStream>(state)
    useEffect(() => {
        AbaixaWraper()
    }, [])
    return (
        <div className="conteiner-abaixa">
            {/*Componentes ondem esta divs animadas*/}
            <Effect_BackGround />
            {/*State ondem o mesmo é ocupado pelo componentes que mostrar um loading falso*/}
            {StateLoading}
            {/*State ondem vai se ocupado pelo componente que dizer o error*/}
            {StateError}
            <h1 className='abaixa-h1-main'>Aguarde enquanto o processo é iniciado</h1>
            <p className='abaixa-p-text'>O download está sendo preparado. Isso pode levar alguns instantes.</p>
            <BotaoBack StateClass={StateBotaoBackClass} />
        </div>
    )
}

export default Abaixa