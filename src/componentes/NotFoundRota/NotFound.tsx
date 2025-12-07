import { Link } from 'react-router-dom'
import './NotFound.scss'

function NotFound404() {

    

    return (
        <div className="conteiner-wraper-404">
            <h1 className='text-404 up-ease'>404 - Não encontrado</h1>
            <Link to='/URL-Youtube' className='Voltar-404 up-ease-delay'>Voltar</Link>
        </div>
    )
}

export default NotFound404