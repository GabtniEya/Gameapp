import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGame } from "../redux/gameslice.jsx";

const emptyGame = { title: "", genre: "", platform: "", price: "", image: "" };

export default function Addgame({ onClose }) {
  const dispatch = useDispatch();
  const [game, setGame] = useState(emptyGame);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const [isReadingImage, setIsReadingImage] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "image") setImageUrl(value);
    setGame((current) => ({ ...current, [name]: value }));
  }

  function handleImageSelect(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Sélectionnez un fichier image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("La photo ne doit pas dépasser 5 Mo.");
      return;
    }

    setIsReadingImage(true);
    setImageError("");
    setImageUrl("");

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setImageError("Impossible de lire la photo sélectionnée.");
      } else {
        setGame((current) => ({ ...current, image: reader.result }));
      }
      setIsReadingImage(false);
    };
    reader.onerror = () => {
      setImageError("Impossible de lire la photo sélectionnée.");
      setIsReadingImage(false);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addGame(game));
    onClose();
  }

  return (
    <form className="game-form add-game-form" onSubmit={handleSubmit}>
      <p className="form-intro">Ajoutez un nouveau titre à votre collection.</p>
      <div className="add-game-fields">
        <label>
          Nom du jeu
          <input name="title" value={game.title} onChange={handleChange} placeholder="Ex. Cyberpunk 2077" required />
        </label>
        <label>
          Genre
          <input name="genre" value={game.genre} onChange={handleChange} placeholder="Ex. Action RPG" required />
        </label>
        <label>
          Plateforme
          <input name="platform" value={game.platform} onChange={handleChange} placeholder="Ex. PC, PS5…" required />
        </label>
        <label>
          Prix (TND)
          <input name="price" type="number" min="0" step="0.001" value={game.price} onChange={handleChange} placeholder="199.990" required />
        </label>
        <label>
          Photo du jeu
          <input type="file" accept="image/*" onChange={handleImageSelect} disabled={isReadingImage} />
          <small className="field-hint">Image JPG, PNG ou autre format — 5 Mo maximum.</small>
        </label>
        <label>
          Ou URL de l’image
          <input name="image" type="url" value={imageUrl} onChange={handleChange} placeholder="https://…" />
        </label>
      </div>
      <aside className="image-preview-panel" aria-label="Aperçu de la photo du jeu">
        {game.image ? (
          <img src={game.image} alt="Aperçu du jeu" />
        ) : (
          <div className="image-preview-empty">
            <span aria-hidden="true">🎮</span>
            <p>L’aperçu de la photo s’affichera ici</p>
          </div>
        )}
        {isReadingImage && <span className="preview-status">Lecture de la photo…</span>}
        {imageError && <span className="preview-error" role="alert">{imageError}</span>}
      </aside>
      <div className="form-actions">
        <button className="button button-quiet" type="button" onClick={onClose}>Annuler</button>
        <button className="button button-primary" type="submit" disabled={isReadingImage}>Ajouter à la collection</button>
      </div>
    </form>
  );
}
