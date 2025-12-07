//Type retornado da rota  /GetOpcao/

export type GetOpcaoType = {
    sucesso: boolean,
    dados: ContentDados
}

//type dados, ondem contem video e audio
export type ContentDados = {
    videos: InfoVideo[],
    audios: InfoAudio[]
}

//informacao de video e audio
type InfoVideo = {
    itag: number,
    qualidade: string,
    resolucao: string,
    size: string,
    videoCodec: string
}

type InfoAudio = {
    itag: number,
    size: string,
    audioCodec: string
}
//Body para abaixa os stream
//Type para manda pro backend
export type BodyAbaixaStream = {
    Itag: number,
    Formato: 'video' | 'audio',
    Url: string
}