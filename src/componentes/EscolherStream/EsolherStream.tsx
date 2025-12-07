import { useLocation, useParams } from 'react-router-dom'
import './EscolherStream.scss'
import Listagem from '../Listagem/Listagem'
//Types
type audioevideo = { videos: object[], audios: object[]}

function EscolherStream() {
    const { state }: { state: { dados: audioevideo, url: string } } = useLocation()
    const dados: audioevideo = {
    "audios": [
        {
            "itag": 139,
            "size": "1.432 MB",
            "audioCodec": "mp4a.40.5"
        },
        {
            "itag": 140,
            "size": "3.798 MB",
            "audioCodec": "mp4a.40.2"
        },
        {
            "itag": 249,
            "size": "1.487 MB",
            "audioCodec": "opus"
        },
        {
            "itag": 251,
            "size": "4.114 MB",
            "audioCodec": "opus"
        }
    ],
    "videos": [
        {
            "itag": 18,
            "size": "4.926 MB",
            "resolucao": "640x360",
            "videoCodec": "avc1.42001E",
            "qualidade": "360p"
        }
    ]
}//state.dados // dados dos stream video e audio
    const url: string = state.url
    console.log(dados)
    //location key
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