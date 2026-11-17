import { useState } from "react";
import { useSelector } from "react-redux";
import Addgame from "./components/Addgame.jsx";
import Editgame from "./components/Editgame.jsx";
import GameList from "./components/GameList.jsx";
import Navbarr from "./components/Navbarr.jsx";
import UserList from "./components/UserList.jsx";

export default function App() {
  const games = useSelector((state) => state.games.games);
  const [dialog, setDialog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function closeDialog() {
    setDialog(null);
  }

  return (
    <div className="app-shell">
      <Navbarr
        gameCount={games.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setDialog({ type: "add" })}
      />
      <main className="page-content" id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span /> VOTRE ESPACE GAMING</p>
            <h1>Votre collection.<br /><span>Votre univers.</span></h1>
            <p className="hero-description">
              Retrouvez tous vos jeux préférés au même endroit. Gérez votre bibliothèque en toute simplicité.
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-glow" />
            <span className="art-controller">🎮</span>
            <span className="art-spark spark-one">✦</span>
            <span className="art-spark spark-two">✧</span>
          </div>
        </section>

        <section className="collection-section" id="games">
          <div className="section-heading">
            <div>
              <p className="eyebrow section-eyebrow">BIBLIOTHÈQUE</p>
              <h2>Mes jeux <span className="heading-count">{games.length}</span></h2>
            </div>
            <button className="button button-outline" onClick={() => setDialog({ type: "add" })}>
              <span aria-hidden="true">＋</span> Ajouter un jeu
            </button>
          </div>
          <GameList
            searchTerm={searchTerm}
            onEdit={(game) => setDialog({ type: "edit", game })}
          />
        </section>
        <section className="info-section" aria-labelledby="about-title" id="about">
          <div>
            <p className="eyebrow section-eyebrow">À PROPOS</p>
            <h2 id="about-title">Tout votre univers gaming, au même endroit</h2>
            <p>
              Game Library réunit votre collection de jeux et un répertoire de contacts dans une seule application.
              Gérez vos titres, retrouvez leurs informations et explorez les contacts chargés depuis une API.
            </p>
            <div className="about-highlights">
              <article>
                <span>01</span>
                <h3>Votre collection</h3>
                <p>Ajoutez vos jeux avec leur photo, genre, plateforme et prix en TND.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Gestion simple</h3>
                <p>Modifiez ou supprimez vos jeux et retrouvez-les avec la recherche.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Répertoire connecté</h3>
                <p>Consultez et filtrez les contacts récupérés depuis JSONPlaceholder.</p>
              </article>
            </div>
          </div>
        </section>
        <UserList />
      </main>
      <footer className="footer">GAME<span>LIBRARY</span><small> — Votre collection de jeux, simplement.</small></footer>

      {dialog && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}>
          <section
            className={`modal ${dialog.type === "add" ? "modal-add-game" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-heading">
              <div>
                <p className="eyebrow section-eyebrow">{dialog.type === "add" ? "NOUVEAU JEU" : "VOTRE COLLECTION"}</p>
                <h2 id="modal-title">{dialog.type === "add" ? "Ajouter un jeu" : "Modifier le jeu"}</h2>
              </div>
              <button className="close-button" onClick={closeDialog} aria-label="Fermer">×</button>
            </div>
            {dialog.type === "add" ? (
              <Addgame onClose={closeDialog} />
            ) : (
              <Editgame key={dialog.game.id} game={dialog.game} onClose={closeDialog} />
            )}
          </section>
        </div>
      )}
    </div>
  );
}
