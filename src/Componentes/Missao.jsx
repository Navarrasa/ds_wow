import { useState } from "react";
import { missoesData } from "../data/missoesData";
import { MissaoModal } from "./MissaoModal";
import { MissaoCard } from "./MissaoCard";

export function Missao() {
    const [missaoSelecionada, setMissaoSelecionada] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const concluirMissao = (id) => {

        const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
        const m = missoesData.find((ms) => ms.id === id);
        const figurinha = {
            id: m.id,
            titulo: m.titulo,
            imagem: m.figura || "src/assets/trofeu.png",
        };

        if (!inventario.some((f) => f.id === id)) {
            inventario.push(figurinha);
            localStorage.setItem('inventario', JSON.stringify(inventario));
        }

        setMissaoSelecionada(null);
        setRefresh((r)=> r + 1);
    };

    return (
        <section className="container">
            <h1>Missões</h1>
            <div className="missao-grid">
                {missoesData.map((missao) => (
                    <MissaoCard
                        key={`${missao.id} - ${refresh}`}
                        missao={missao}
                        onClick={() => setMissaoSelecionada(missao)}
                    
                    />
                ))}
            </div>

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