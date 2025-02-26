import ProfileServer from "./ProfileServer";

export default function ProfilePage() {
    return (
      <main>
        <h1>My Profile</h1>
        <ProfileServer />
        <a href="/api/auth/logout">Logout</a>
      </main>
    );
  }

