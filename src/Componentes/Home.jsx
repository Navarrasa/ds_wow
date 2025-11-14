import home_icon from "../assets/home.png";
import { Link } from "react-router-dom";

export function HomePageIcon() {

    // Renderizando um ícone simples que redireciona para a página inicial

    return(

        <section className='home-icon' aria-label="Ícone para página inicial">
            <Link to="/">
                <figure>
                    <img src={home_icon} alt="Ícone da página inicial" title="Voltar para a página inicial"/>
                </figure>
            </Link>
        </section>
    );
}