import { useSelector } from "react-redux";
import Gamecard from "./Gamecard.jsx";

export default function GameList({ onEdit, searchTerm = "" }) {
  const games = useSelector((state) => state.games.games);
  const query = searchTerm.trim().toLocaleLowerCase();
  const filteredGames = games.filter((game) =>
    [game.title, game.genre, game.platform].some((value) =>
      value.toLocaleLowerCase().includes(query),
    ),
  );

  if (filteredGames.length === 0 && query) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">⌕</span>
        <h3>Aucun jeu trouvé</h3>
        <p>Essayez un autre titre, genre ou plateforme.</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">🎮</span>
        <h3>Votre collection est vide</h3>
        <p>Ajoutez votre premier jeu pour commencer votre bibliothèque.</p>
      </div>
    );
  }

  return (
    <div className="games-grid">
      {filteredGames.map((game) => <Gamecard key={game.id} game={game} onEdit={onEdit} />)}
    </div>
  );
}
