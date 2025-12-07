import { useLocation, useParams } from 'react-router-dom'
import './EscolherStream.scss'
import Listagem from '../Listagem/Listagem'
//Types
type audioevideo = { videos: object[], audios: object[]}

function EscolherStream() {
    const { state }: { state: { dados: audioevideo, url: string } } = useLocation()
    const dados: audioevideo = state.dados // dados dos stream video e audio
    const url: string = state.url
    //location key
    console.log("escolherstream.tsx")
    console.log(url)
    const localtion = useLocation()
    return (
        <div className="conteiner-Escolher-Stream" key={localtion.key}>
            <h1>Selecione o formato desejado</h1>
            <p>Clique em uma das opções para continuar o processamento</p>
            <div className="conteiner-streams">
                <Listagem
                    textup='Audio'
                    formato='audio'
                    dados={dados.audios}
                    url={url}
                    key={"A - " + localtion.key} />
                <Listagem
                    textup='Video'
                    formato='video'
                    dados={dados.videos}
                    url={url}
                    key={"B - " + localtion.key} />
            </div>
        </div>
    )
}

export default EscolherStream