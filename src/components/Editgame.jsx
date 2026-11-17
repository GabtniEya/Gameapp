import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGame } from "../redux/gameslice.jsx";

export default function Editgame({ game, onClose }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState(game);

  useEffect(() => {
    setValues(game);
  }, [game]);

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(updateGame(values));
    onClose();
  }

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <p className="form-intro">Modifiez les informations de ce jeu.</p>
      <label>
        Titre du jeu
        <input name="title" value={values.title} onChange={handleChange} required />
      </label>
      <div className="form-row">
        <label>
          Genre
          <input name="genre" value={values.genre} onChange={handleChange} required />
        </label>
        <label>
          Plateforme
          <input name="platform" value={values.platform} onChange={handleChange} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Prix (TND)
          <input name="price" type="number" min="0" step="0.001" value={values.price} onChange={handleChange} required />
        </label>
        <label>
          Image (URL)
          <input name="image" type="url" value={values.image || ""} onChange={handleChange} placeholder="https://…" />
        </label>
      </div>
      <div className="form-actions">
        <button className="button button-quiet" type="button" onClick={onClose}>Annuler</button>
        <button className="button button-primary" type="submit">Enregistrer</button>
      </div>
    </form>
  );
}
