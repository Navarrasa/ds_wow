import { useState } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const concluirMissao = (id, imagemEscolhida) => {
    // Lê o inventário existente
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];

    // Encontra os dados da missão
    const m = missoes.find((ms) => ms.id === id);

    // Cria o objeto figurinha
    const figurinha = {
      id: m.id,
      nome: m.titulo || `Figurinha ${m.id}`,
      imagem:
        imagemEscolhida ||
        m.figurinha ||
        "/src/assets/figurinhas/bob_arco_iris.png",
    };

    // Evita duplicar a mesma figurinha
    if (!inventario.some((f) => f.id === id)) {
      inventario.push(figurinha);
      localStorage.setItem("inventario", JSON.stringify(inventario));
    }

    // Fecha o modal e atualiza
    setMissaoSelecionada(null);
    setRefresh((r) => r + 1);
  };

  return (
     <section className="conteiner" aria-labelledby="titulo-missoes">
      <h2 id="titulo-missoes">Missões</h2>

      <section
        className="missoes-grid"
        aria-label="Lista de missões disponíveis"
      >
        {missoes.map((m) => (
          <MissaoCard
            key={`${m.id}-${refresh}`}
            missao={m}
            onIniciarMissao={setMissaoSelecionada}
          />
        ))}
      </section>

      {missaoSelecionada && (
        <MissaoModal
          missao={missaoSelecionada}
          onClose={() => setMissaoSelecionada(null)}
          onConcluir={concluirMissao}
        />
      )}
    </section>
    );
}
