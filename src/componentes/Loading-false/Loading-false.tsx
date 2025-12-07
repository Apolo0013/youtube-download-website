import './Loading-false.scss'

type Props = {
    diametro?: number,
    text?: string
}

function Loading({ diametro = 50, text }: Props) {
    return (
        <div className="wraper-conteiner-loading">
            <span className="loading"
                style={{ height: diametro + "%"}}
            ></span>
            {text ? <h3 className='text-loading'>{text}</h3> : ""}
        </div>
    )
}

export default Loading