export function MissaoCard({ missao, onIniciarMissao,concluida  }) {

    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    const concluidalocal = inventario.some((f) => f.id === missao.id);

    const isConcluida = concluida !== undefined  ? concluida : concluidalocal;

    return (
    <article className='missao-card'>
        <header>
            <h3 id={missao.id}>{missao.titulo}</h3>
        </header>
        <p>{missao.missao}</p>
        <button
            onClick={() => onIniciarMissao(missao)}
            disabled={isConcluida}>
            {isConcluida ? "Missão concluída" : "Iniciar Missão"}
        </button>
    </article>
    );
}
