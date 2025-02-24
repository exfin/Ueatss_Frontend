import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const session = await getSession();

  if (!session?.user) {
    return <p>Please log in to view your profile.</p>;
  }

  const { user } = session;

  return (
    <div>
      <img src={user.picture ?? "/default-profile.png"} alt={user.name ?? "User"} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
