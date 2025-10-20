import { useNavigate } from 'react-router-dom';

export function Inicial() {
    const navigate = useNavigate();

    return (        
        <section className="inicial">
            <article className='InicialDescritivo'>
                <h1>Entrar no Jogo!</h1>
                <button onClick={() => navigate('/dsgo')} className='entrar'>
                    Entrar  
                </button>
            </article>
        </section>
  );
}
