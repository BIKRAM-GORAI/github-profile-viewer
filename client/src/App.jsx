import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    const res = await fetch(
      `https://api.github.com/users/${username}`
    );
    const data = await res.json();
    setProfile(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>GitHub Profile Viewer</h1>

      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="GitHub username"
      />
      <button onClick={fetchProfile}>Search</button>

      {profile && profile.login && (
        <div>
          <img src={profile.avatar_url} width="100" />
          <p>{profile.name}</p>
          <p>Repos: {profile.public_repos}</p>
        </div>
      )}

      {/* TODO: Handle user not found */}
      {/* TODO: Add loading indicator */}
      {/* TODO: Improve UI */}
    </div>
  );
}

export default App;

