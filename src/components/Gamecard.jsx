import { useDispatch } from "react-redux";
import { deleteGame } from "../redux/gameslice.jsx";

export default function Gamecard({ game, onEdit }) {
  const dispatch = useDispatch();

  return (
    <article className="game-card">
      <div className="game-image-wrap">
        {game.image ? (
          <img
            className="game-image"
            src={game.image}
            alt={`Couverture de ${game.title}`}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : null}
        <div className="image-placeholder" aria-hidden="true">🎮</div>
        <span className="genre-pill">{game.genre}</span>
      </div>
      <div className="game-card-content">
        <div className="game-title-row">
          <h3>{game.title}</h3>
          <span className="game-price">{Number(game.price).toFixed(2)} €</span>
        </div>
        <p className="game-platform"><span className="platform-icon" aria-hidden="true">▣</span>{game.platform}</p>
        <div className="card-actions">
          <button className="button button-edit" onClick={() => onEdit(game)} aria-label={`Modifier ${game.title}`}>
            <span aria-hidden="true">✎</span> Modifier
          </button>
          <button className="button button-delete" onClick={() => dispatch(deleteGame(game.id))} aria-label={`Supprimer ${game.title}`}>
            <span aria-hidden="true">⌫</span> Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}
