import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard.jsx";

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(USERS_API_URL, {
          signal: controller.signal,
        });
        setUsers(response.data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          console.error("Impossible de récupérer les contacts :", requestError);
          setError("Les contacts n’ont pas pu être récupérés.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();
    return () => controller.abort();
  }, [retryCount]);

  const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
  const filteredUsers = users.filter((user) =>
    user.name.toLocaleLowerCase().includes(normalizedSearch),
  );

  return (
    <section className="contacts-section" aria-labelledby="contact-title" id="contact">
      <div className="section-heading">
        <div>
          <p className="eyebrow section-eyebrow">RÉPERTOIRE</p>
          <h2 id="contact-title">
            ContactBook <span className="heading-count">{users.length}</span>
          </h2>
        </div>
        <span className="contacts-total">
          {users.length} {users.length === 1 ? "contact récupéré" : "contacts récupérés"}
        </span>
      </div>

      <p className="contacts-description">
        Répertoire de démonstration chargé depuis l’API JSONPlaceholder.
      </p>
      <label className="contacts-search">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Rechercher un contact par nom..."
          aria-label="Rechercher un contact par nom"
        />
      </label>

      {loading ? (
        <p className="contacts-message" role="status">Chargement des contacts...</p>
      ) : error ? (
        <div className="contacts-error" role="alert">
          <p>{error}</p>
          <button
            className="button button-outline"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Réessayer
          </button>
        </div>
      ) : filteredUsers.length === 0 ? (
        <p className="contacts-message">Aucun contact ne correspond à cette recherche.</p>
      ) : (
        <div className="contacts-grid">
          {filteredUsers.map((user) => <UserCard key={user.id} user={user} />)}
        </div>
      )}
    </section>
  );
}
