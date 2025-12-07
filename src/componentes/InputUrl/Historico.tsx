//historico de link que ele colou la.
import { useEffect, useState, type Dispatch, type JSX, type SetStateAction } from 'react'
import './Historico.scss'
import { Get, LISTAHISTORICO_LS, type typeurlhistorico } from '../../utils/localstorage'
import { randint } from '../../utils/utils'

type Props = {
    SetValue: (url: string) => void,
    SetStateSelf: Dispatch<SetStateAction<JSX.Element | null | undefined>>
}


//SetValue receber: SetState do input ondem fica a url.
function Historico({ SetValue, SetStateSelf }: Props) {
    function AddItem() {
        //pegandos as lista de url.
        const listastring: string | null = Get(LISTAHISTORICO_LS)
        //caso ele retorne null, nao passara pela essa condicao
        if (listastring) { 
            //agora vamos transforma em lista
            const listaurl = JSON.parse(listastring) as typeurlhistorico[]
            //botando em ondem de tempo, do recente para o mais velho
            const listaurlsort: typeurlhistorico[] = listaurl.sort((a, b) => b.time - a.time)
            const ListaElementItem: JSX.Element[] = [] // Lista de elementos
            for (const info of listaurlsort) {
                const key: number = randint(0, 1000000)
                ListaElementItem.push(
                    <div key={key} className="item-historico" onClick={() => SetValue(info.url)}>
                        <p className='item-historico-text'>{info.url}</p>
                    </div>
                )
            }
            //add a lista no state
            SetItemHistorico(ListaElementItem)
        }
        else {console.warn('nao ha nenhum historico aqui pae.')}
    }


    const [StateItemHistorico, SetItemHistorico] = useState<JSX.Element[]>()
    useEffect(() => {
        AddItem()
    }, [])
    return (
        <div className="wraper-conteiner-historico" onMouseLeave={() => SetStateSelf(null)}>
            <h3 className="text-h3-historico">Historico</h3>
            <div className="conteiner-historico">
                {StateItemHistorico}
            </div>
        </div>
    )
}

export default Historico