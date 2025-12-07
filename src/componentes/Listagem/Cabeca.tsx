import { Cp } from '../../utils/utils'
import './Cabeca.scss'

function Cabeca({ items }: { items: string[] }) {
    return (
        <div className="conteiner-head-tb Linha-tb">
            {items.map((valor, i) => (
                <div key={i} className="conteiner-head-tb-item Cedula-tb">{Cp(valor)}</div>
            ))}
        </div>
    )
}

export default Cabeca