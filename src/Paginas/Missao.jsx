import { useState } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';

export function Missao() {
    const [missaoSelecionada, setMissaoSelecionada] = useState(null);
    const [missoesConcluidas, setMissoesConcluidas] = useState([]);

    const concluirMissao = (id) => {
        setMissoesConcluidas((prev) => [...prev, id]); // adiciona id no array
        setMissaoSelecionada(null); // fecha modal
    };

  return (
    <section className='conteiner'>
        <header>
            <h2>Missões</h2>
        </header>
        <ul className="missoes-grid">
            <li>
                {missoes.map((m) => (
                <MissaoCard
                key={m.id}
                missao={m}
                onIniciarMissao={setMissaoSelecionada}
                concluida={missoesConcluidas.includes(m.id)}
                />
                ))}
            </li>
        </ul>
            
        {missaoSelecionada && (
            <MissaoModal 
            missao={missaoSelecionada} 
            onClose={() => setMissaoSelecionada(null)} 
            onConcluir={() => concluirMissao(missaoSelecionada.id)} 
            />
        )}
    </section>
    );
}
