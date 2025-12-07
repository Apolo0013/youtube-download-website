import {useRef, useState, type JSX } from 'react'
import './InputUrl.scss'
//imagens
import PasteIMG from '../../assets/paste.svg'
//Utils-requesicoes
import { PegarStreamURL, VerificarURL } from '../../utils/utils-requisicoes'
//Type
import { type GetOpcaoType } from '../../type'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading-false/Loading-false'
import Historico from './Historico'
import {AddUrlLocalStorage, Get ,LISTAHISTORICO_LS} from '../../utils/localstorage'
import { type GlobalContextType } from '../../Context/ContextGlobal'
import { GetGlobal } from '../../Context/ProviderContext'

function InputUrl() {
    function SetError(text: string) {
        SetErrorS(<p className='p-error'>{text}</p>) 
    }


    //quando ele clica no enter
    async function EnterURL() {
        //Efeitos
        SetLoading(<Loading text='Espere Porfavor'/>) // loanding para esperar
        SetClassCM('conteiner-effect') // efeito no container
        //Pegando a url
        const url: string = StateValueURL;
        //Regex para pegar apenas as url do youtube
        const regex: RegExp = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}($|[&?].*)/
        if (regex.test(url)) { // url for valida
            //Funcao que vai add o url no historico.
            AddUrlLocalStorage(url)
            const valido = await VerificarURL(url) // verificando com backend se a url é valida
            if (valido) {
                //retirando qua o error, caso o tenha
                SetErrorS(null)
                //Pegando as informacoes de stream
                const conteudo: GetOpcaoType | null = await PegarStreamURL(url)
                if (!conteudo) return // se ele for null
                const dados = conteudo.dados
                //=====================================================
                //Alterando o valor no contextgloba
                Global!.UrlFornecida = true // alterando para true (sim a url fornecida.)
                //Passando de rota, para listagem dos strea
                console.log(url)
                nv('/URL-Youtube/Stream', {
                    state: {dados: dados, url: url}
                })
            }
            //Invalido
            else SetError("Url invalida!") // caso a for invalida
        }
        else SetError("Url invalida!") // caso a url for invalida
        //Retirando o efeito depois de verificar tudo.
        SetLoading(null)
        SetClassCM('')
    }

    //States class
    const [ClassPlaceHolder, SetClassPH] = useState<string>('')
    const [ClassInput, SetClassIT] = useState<string>('')
    const [ClassContainerMain, SetClassCM] = useState<string>('')
    //State value
    const [StateValueURL, SetValueURL] = useState<string>("")
    //Navigate
    const nv = useNavigate()
    //State para componentes
    const [StateLoading, SetLoading] = useState<JSX.Element | null>()  // componentes de carregar
    //State historico, o main 
    const [StateHistorico, SetHistorico] = useState<JSX.Element | null>() // para componentes de mostrar o historico
    //state  historico o segundo(usado para responsividade para dispositivos moveis)
    const [StateHistoricoSeg, SetHistoricoSeg] = useState<JSX.Element | null>()
    //state usado para exbir o error
    const [StateError, SetErrorS] = useState<JSX.Element | null>()
    //Global
    const Global: GlobalContextType | null = GetGlobal()!
    //Key
    const Key = useRef<string>(`${Date.now()} - URLINPUT`)
    return (
        <div className={`conteiner-input-url ${ClassContainerMain}`} key={Key.current}>
            {StateLoading}
            <img className='logo-youtube' src="https://logo.svgcdn.com/logos/youtube.svg" alt="logo-youtube" />
            <h3 className='text-orienta-urlinput'>Coloque a URL do youtube ai gld</h3>
            <div className="conteiner-url">
                {/* Historico de Links */}
                {StateHistorico}
                {/* Funcao para colar oq esta selecionado dentro no ctrl + c */}
                <span className='colar-input-url' onClick={async () => {
                    const conteudo = await navigator.clipboard.readText() // pegando o conteudo copiado
                    SetValueURL(conteudo) // dando o valor do input do valor copiado.
                    //ja que estou dando um valor pra ele, vamos subir o placeholder
                    SetClassPH('up-placeholder') // subindo placeholder
                    EnterURL() // chamando a funcao que faz a verificacao, e ja avisa o o usuario
                }}><img src={PasteIMG} alt="Colar Conteudo" /></span>
                {/* Placeholder, que  nao é bem um, mas ele imitar */}
                <span className={`placeholder-input-url ${ClassPlaceHolder}`}>Url</span>
                {/* Input em si, ondeme ele vai receber  os valores. */}
                <input
                    //atributos
                    className={ClassInput}
                    value={StateValueURL} // state que vai pegar o valor atual do input
                    id="url"
                    name="url"
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    //Eventos
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => SetValueURL(e.currentTarget.value)}
                    onFocus={() => {
                        // so vai receber quando estive vazio
                        if (StateValueURL.length == 0) SetClassPH('up-placeholder') // add a class
                        SetClassIT('')
                        //ativando o historico
                        //se ele retorna algo diferente de null, ele rederizar o componentes
                        if (Get(LISTAHISTORICO_LS)) SetHistorico(
                            <Historico
                                //Funcao que receber uma url e add no input
                                SetValue={(url: string) => {
                                    SetClassPH('up-placeholder') // sobe o placeholder, pq tem valor dentro
                                    SetValueURL(url) // add o url no value do input
                                }}
                                //State do Historico passado para ele mesmo.
                                SetStateSelf={SetHistorico}
                            />)
                    }}
                    onBlur={() => {
                        //caso ele esteja vazio ele voltar, senao
                        if (StateValueURL.length == 0) SetClassPH('') // retirando as class do placeholder-input-url
                        SetClassIT('input-color-trans') // retirando
                    }}
                    //Key, caso ele aperte enter
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key.toLowerCase() == "enter") EnterURL()
                    }}
                />
                <button className='btn-Manda-URL' onClick={EnterURL}>
                    Enter
                </button>
            </div>
            {StateError}
        </div>
    )
}

export default InputUrl