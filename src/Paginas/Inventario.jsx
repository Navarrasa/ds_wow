import { useEffect, useState } from "react";

export function Inventario() {
  const [figurinhas, setFigurinhas] = useState([]);

  useEffect(() => {
    // Carrega o inventário salvo ao abrir a página
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setFigurinhas(armazenado);
  }, []);

  const limparInventario = () => {
    if (!window.confirm("Deseja realmente limpar o inventário?")) return;

    localStorage.removeItem("inventario");
    setFigurinhas([]);
  };

  return (
    <section className="conteiner">
      <article className="inventario">
        <header>
          <h2>Inventário</h2>
        </header>

        <nav className="nav-inv">
          <button
            className="limpar-inventario"
            onClick={limparInventario}
          >
            Limpar Inventário
          </button>
        </nav>

        {/* Sem figurinhas */}
        {figurinhas.length === 0 ? (
          <p className="vazio">Nenhuma figurinha coletada ainda!</p>
        ) : (
          <section
            className="grid"
            aria-label="Lista de figurinhas coletadas"
          >
            {figurinhas.map((f) => (
              <article
                key={f.id}
                className="figurinha"
                aria-labelledby={`figurinha-${f.id}`}
              >
                <figure>
                  <img src={f.imagem} alt={f.nome} />
                  <figcaption id={`figurinha-${f.id}`} />
                </figure>
              </article>
            ))}
          </section>
        )}
      </article>
    </section>
  );
}
