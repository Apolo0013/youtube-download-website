import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.scss'
//Componentes
import InputUrl from './componentes/InputUrl/InputUrl'
import NotFound404 from './componentes/NotFoundRota/NotFound';
import EscolherStream from './componentes/EscolherStream/EsolherStream';
import Abaixa from "./componentes/Abaixa/Abaixa";
import ProviderContext from "./Context/ProviderContext";
import ProtecaoRotaURL from "./Rotas/ProtecaoRotaURL";

function App() {
    return (
        <ProviderContext>
            <div className="conteiner-app">
                <Routes >
                    <Route path="/URL-Youtube" element={<InputUrl />}></Route>
                    <Route path="/URL-Youtube/Stream" element={
                        <ProtecaoRotaURL target="stream">
                            <EscolherStream />
                        </ProtecaoRotaURL>
                    }></Route>
                    <Route path="/URL-Youtube/Stream/DownLoad" element={
                        <ProtecaoRotaURL target='download'>
                            <Abaixa />
                        </ProtecaoRotaURL>
                    }></Route>
                    <Route path="/" element={<Navigate to="/URL-Youtube" />}></Route>
                    <Route path="*" element={<NotFound404 />}></Route> 
                </Routes>
            </div>
        </ProviderContext >
    ) 
}

export default App