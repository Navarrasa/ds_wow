import missao from '../assets/missao_tratado.png';
import mapa from '../assets/mapa_tratado.png';
import bau from '../assets/bau_tratado.png';
import camera from '../assets/camera_tratado.png';
import { Link } from 'react-router-dom'

export function Menu() {
    return (
        <section className='menu'>
            <ul>
                <li>
                    <Link to='missao'>
                        <figure>
                            <img src={missao} alt="Imagem de Missões" />
                            <figcaption>Missões</figcaption>
                        </figure>
                    </Link>
                </li>
         
                <li>
                    <Link to='inventario'>
                        <figure>
                            <img src={bau} alt="Imagem de Inventário" />
                            <figcaption>Inventário</figcaption>
                        </figure>
                    </Link>
                </li>
                <li>
                    <Link to='geolocalizacao'>
                        <figure>
                            <img src={mapa} alt="Imagem de GeoLocalização" />
                            <figcaption>GeoLocalização</figcaption>
                        </figure>
                    </Link>
                </li>

                <li>
                    <Link to='camera'>
                        <figure>
                            <img src={camera} alt="Imagem de Câmera" />
                            <figcaption>Câmera</figcaption>
                        </figure>
                    </Link>
                </li>
            </ul>
        </section>
    )
}