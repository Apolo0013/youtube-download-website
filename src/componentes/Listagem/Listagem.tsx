import './Listagem.scss'
import Cabeca from './Cabeca'
import Item from './Item'
import { useLocation, useNavigate } from 'react-router-dom'
import type { BodyAbaixaStream } from '../../type'

//essa funcao vai receber um dicionario, que tem as informacoes, assim vai fazer dele uma tabela
type Props = {
    dados: object[], //chave  e valores sao relativo entrem audio e video
    textup: string,
    formato: "video" | "audio", // para nois indentificar o formato
    url: string
}
function Listagem({ dados, textup, formato, url }: Props) {
    const nv = useNavigate() // navegador
    //key localtion
    const localtion = useLocation()
    console.log("listagem.tsx")
    console.log(dados)
    return (
        <div className="wraper-Conteiner-Listagem">    
            <h3>{textup}</h3>
            <div className="Conteiner-Listagem">
                <Cabeca items={Object.keys(dados[0])} key={`cabeca - ${localtion.key}`} />
                {
                    //aqui vamos pegar os valores ou seja, chave
                    dados.map((valor, i) => (
                        <Item
                            key={`item${i} - ${localtion.key}`} items={Object.values(valor)}
                            onClick={() => {
                                //confiar aqui itag existir
                                const {itag} = valor as { itag: number }
                                //aqui temos.
                                //itag e formato
                                const body: BodyAbaixaStream = { Formato: formato, Itag: itag, Url: url}
                                nv('/URL-Youtube/Stream/DownLoad', {
                                    state: body
                                })
                            }}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Listagem