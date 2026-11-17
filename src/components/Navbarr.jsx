export default function Navbarr({ gameCount, searchTerm, onSearchChange, onAddClick }) {
  return (
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Game Library accueil">
        <span className="brand-mark" aria-hidden="true">G</span>
        <span>GAME<span className="brand-light">LIBRARY</span></span>
      </a>
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Rechercher un jeu..."
          aria-label="Rechercher un jeu par titre, genre ou plateforme"
        />
      </label>
      <nav className="topbar-actions" aria-label="Navigation principale">
        <div className="nav-links">
          <a href="#games">Jeux</a>
          <a href="#contact">Contact</a>
          <a href="#about">À propos</a>
        </div>
        <span className="collection-count">{gameCount} {gameCount === 1 ? "jeu" : "jeux"}</span>
        <button className="button button-primary nav-add" onClick={onAddClick}>
          <span aria-hidden="true">＋</span> Ajouter un jeu
        </button>
      </nav>
    </header>
  );
}
