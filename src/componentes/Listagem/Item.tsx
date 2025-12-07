import { useLocation } from 'react-router-dom'
import { GetGlobal } from '../../Context/ProviderContext'
import './Item.scss'

type Props = {
    items: string[],
    onClick: () => void
}

function Item({ items, onClick }: Props) {
    const info = GetGlobal()
    const localtion = useLocation()
    return (
        <div className="conteiner-item-tb Linha-tb" onClick={() => {
            onClick() // ativando o onclick fornicdo no props
            info!.StreamFornecida = true // falando que o stream foi fornecido
        }}>
            {
                items.map((valor, i) => (
                    <div key={`item${i} - ${localtion.key}`} className="conteiner-item-tb-item Cedula-tb">{valor}</div>
                ))
            }
        </div>
    )
}

export default Item