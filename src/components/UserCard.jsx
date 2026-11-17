export default function UserCard({ user }) {
  return (
    <article className="contact-card">
      <div className="contact-avatar" aria-hidden="true">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="contact-card-heading">
        <h3>{user.name}</h3>
        <p>{user.company.name}</p>
      </div>
      <dl className="contact-details">
        <div>
          <dt>E-mail</dt>
          <dd><a href={`mailto:${user.email}`}>{user.email}</a></dd>
        </div>
        <div>
          <dt>Téléphone</dt>
          <dd>{user.phone}</dd>
        </div>
        <div>
          <dt>Ville</dt>
          <dd>{user.address.city}</dd>
        </div>
      </dl>
    </article>
  );
}
