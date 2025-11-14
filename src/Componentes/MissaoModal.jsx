import { useState } from "react";

import win1 from "../assets/cartinhas/win1.png";
import win2 from "../assets/cartinhas/win2.png";
import loss1 from "../assets/cartinhas/loss1.png";
import loss2 from "../assets/cartinhas/loss2.png";

const figurinhasSucesso = [win1, win2];
const figurinhasErro = [loss1, loss2];

export function MissaoModal({ missao, onClose, onConcluir }) {
const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);
  const [figurinhaAtual, setFigurinhaAtual] = useState(null);

  const verificarResposta = () => {
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      return;
    }

    if (
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase()
    ) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");

      // Escolhe figurinha aleatória de sucesso
      const aleatoria =
        figurinhasSucesso[Math.floor(Math.random() * figurinhasSucesso.length)];
      setFigurinhaAtual(aleatoria);

      // Chama a função de concluir após 5s
      setTimeout(() => {
        onConcluir(missao.id, aleatoria);
      }, 5000);
    } else {
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");

      // Escolhe figurinha aleatória de erro
      const aleatoria =
        figurinhasErro[Math.floor(Math.random() * figurinhasErro.length)];
      setFigurinhaAtual(aleatoria);
    }
};

return (
    <dialog
        open
        className="modal"
        aria-labelledby="titulo-missao"
        aria-describedby="descricao-missao"
    >
    <header>
        <h2 className="titulo" id="titulo-missao">
            {missao.titulo}
        </h2>
    </header>

    <form onSubmit={(e) => { e.preventDefault(); verificarResposta(); }}>
        <section>
            <p id="descricao-missao">{missao.descricao}</p>

            <label htmlFor="resposta" className="sr-only">
                Digite sua resposta
            </label>
            <input
                className="caixaTexto"
                id="resposta"
                type="text"
                placeholder="Digite sua resposta..."
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
                required
            />
        </section>

        <div className="modal-botoes">
            <button type="submit">Enviar</button>
            <button type="button" onClick={onClose}>Fechar</button>
        </div>
    </form>

    {resultado && (
        <section className="resultado" role="alert" aria-live="assertive">
          <p>{resultado}</p>
          {figurinhaAtual && (
            <img
              src={figurinhaAtual}
              alt="Figurinha do resultado"
              width="500"
            />
          )}
        </section>
      )}
    </dialog>
);
}
