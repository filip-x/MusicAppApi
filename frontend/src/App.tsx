import { useState, useEffect } from 'react';
import './App.css';

// Types
interface Artist {
  id?: number;
  name: string;
  starting_date: string;
}

interface Album {
  id?: number;
  name: string;
}

interface Song {
  id?: number;
  name: string;
}

interface Playlist {
  id?: number;
  name: string;
}

interface User {
  id?: number;
  username: string;
  password?: string;
}

// API Service
const api = {
  async get<T>(endpoint: string): Promise<T[]> {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Failed to create ${endpoint}`);
    return response.json();
  },

  async put<T>(endpoint: string, id: number, data: any): Promise<T> {
    const response = await fetch(`${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Failed to update ${endpoint}`);
    return response.json();
  },

  async delete(endpoint: string, id: number): Promise<void> {
    const response = await fetch(`${endpoint}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete ${endpoint}`);
  },
};

// Reusable Card Component
function MusicCard({ children, gradient }: { children: React.ReactNode; gradient?: string }) {
  return (
    <div className={`music-card ${gradient || ''}`}>
      {children}
    </div>
  );
}

// Components
function Artists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', starting_date: '' });

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const data = await api.get<Artist>('/artist');
      setArtists(data);
    } catch (error) {
      console.error('Error loading artists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/artist', {
        name: formData.name,
        starting_date: formData.starting_date,
      });
      setFormData({ name: '', starting_date: '' });
      setShowForm(false);
      loadArtists();
    } catch (error) {
      console.error('Error creating artist:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this artist?')) return;
    try {
      await api.delete('/artist', id);
      loadArtists();
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="content-container">
      <div className="section-header">
        <h2 className="section-title">Artists</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="spotify-button primary"
        >
          {showForm ? 'Cancel' : '+ Add Artist'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label className="form-label">Artist Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="Enter artist name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Starting Date</label>
              <input
                type="date"
                value={formData.starting_date}
                onChange={(e) => setFormData({ ...formData, starting_date: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="spotify-button success">
              Create Artist
            </button>
          </form>
        </div>
      )}

      <div className="grid-layout">
        {artists.length === 0 ? (
          <div className="empty-state">
            <p>No artists yet. Add your first artist!</p>
          </div>
        ) : (
          artists.map((artist) => (
            <MusicCard key={artist.id} gradient="gradient-purple">
              <div className="card-content">
                <div className="card-icon">🎤</div>
                <h3 className="card-title">{artist.name}</h3>
                <p className="card-subtitle">Started: {new Date(artist.starting_date).toLocaleDateString()}</p>
                <button
                  onClick={() => handleDelete(artist.id!)}
                  className="card-action-button"
                >
                  Delete
                </button>
              </div>
            </MusicCard>
          ))
        )}
      </div>
    </div>
  );
}

function Songs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      const data = await api.get<Song>('/song');
      setSongs(data);
    } catch (error) {
      console.error('Error loading songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/song', { name: formData.name });
      setFormData({ name: '' });
      setShowForm(false);
      loadSongs();
    } catch (error) {
      console.error('Error creating song:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this song?')) return;
    try {
      await api.delete('/song', id);
      loadSongs();
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="content-container">
      <div className="section-header">
        <h2 className="section-title">Songs</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="spotify-button primary"
        >
          {showForm ? 'Cancel' : '+ Add Song'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label className="form-label">Song Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="Enter song name"
                required
              />
            </div>
            <button type="submit" className="spotify-button success">
              Create Song
            </button>
          </form>
        </div>
      )}

      <div className="grid-layout">
        {songs.length === 0 ? (
          <div className="empty-state">
            <p>No songs yet. Add your first song!</p>
          </div>
        ) : (
          songs.map((song) => (
            <MusicCard key={song.id} gradient="gradient-green">
              <div className="card-content">
                <div className="card-icon">🎵</div>
                <h3 className="card-title">{song.name}</h3>
                <button
                  onClick={() => handleDelete(song.id!)}
                  className="card-action-button"
                >
                  Delete
                </button>
              </div>
            </MusicCard>
          ))
        )}
      </div>
    </div>
  );
}

function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      const data = await api.get<Album>('/album');
      setAlbums(data);
    } catch (error) {
      console.error('Error loading albums:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/album', { name: formData.name });
      setFormData({ name: '' });
      setShowForm(false);
      loadAlbums();
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this album?')) return;
    try {
      await api.delete('/album', id);
      loadAlbums();
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="content-container">
      <div className="section-header">
        <h2 className="section-title">Albums</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="spotify-button primary"
        >
          {showForm ? 'Cancel' : '+ Add Album'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label className="form-label">Album Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="Enter album name"
                required
              />
            </div>
            <button type="submit" className="spotify-button success">
              Create Album
            </button>
          </form>
        </div>
      )}

      <div className="grid-layout">
        {albums.length === 0 ? (
          <div className="empty-state">
            <p>No albums yet. Add your first album!</p>
          </div>
        ) : (
          albums.map((album) => (
            <MusicCard key={album.id} gradient="gradient-blue">
              <div className="card-content">
                <div className="card-icon">💿</div>
                <h3 className="card-title">{album.name}</h3>
                <button
                  onClick={() => handleDelete(album.id!)}
                  className="card-action-button"
                >
                  Delete
                </button>
              </div>
            </MusicCard>
          ))
        )}
      </div>
    </div>
  );
}

function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      const data = await api.get<Playlist>('/playlist');
      setPlaylists(data);
    } catch (error) {
      console.error('Error loading playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/playlist', { name: formData.name });
      setFormData({ name: '' });
      setShowForm(false);
      loadPlaylists();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this playlist?')) return;
    try {
      await api.delete('/playlist', id);
      loadPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="content-container">
      <div className="section-header">
        <h2 className="section-title">Playlists</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="spotify-button primary"
        >
          {showForm ? 'Cancel' : '+ Add Playlist'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label className="form-label">Playlist Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="Enter playlist name"
                required
              />
            </div>
            <button type="submit" className="spotify-button success">
              Create Playlist
            </button>
          </form>
        </div>
      )}

      <div className="grid-layout">
        {playlists.length === 0 ? (
          <div className="empty-state">
            <p>No playlists yet. Create your first playlist!</p>
          </div>
        ) : (
          playlists.map((playlist) => (
            <MusicCard key={playlist.id} gradient="gradient-pink">
              <div className="card-content">
                <div className="card-icon">🎶</div>
                <h3 className="card-title">{playlist.name}</h3>
                <button
                  onClick={() => handleDelete(playlist.id!)}
                  className="card-action-button"
                >
                  Delete
                </button>
              </div>
            </MusicCard>
          ))
        )}
      </div>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await api.get<User>('/user');
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/user', {
        username: formData.username,
        password: formData.password,
      });
      setFormData({ username: '', password: '' });
      setShowForm(false);
      loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete('/user', id);
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="content-container">
      <div className="section-header">
        <h2 className="section-title">Users</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="spotify-button primary"
        >
          {showForm ? 'Cancel' : '+ Add User'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="form-input"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="form-input"
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="spotify-button success">
              Create User
            </button>
          </form>
        </div>
      )}

      <div className="grid-layout">
        {users.length === 0 ? (
          <div className="empty-state">
            <p>No users yet. Add your first user!</p>
          </div>
        ) : (
          users.map((user) => (
            <MusicCard key={user.id} gradient="gradient-orange">
              <div className="card-content">
                <div className="card-icon">👤</div>
                <h3 className="card-title">{user.username}</h3>
                <button
                  onClick={() => handleDelete(user.id!)}
                  className="card-action-button"
                >
                  Delete
                </button>
              </div>
            </MusicCard>
          ))
        )}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState<'artists' | 'songs' | 'albums' | 'playlists' | 'users'>('artists');

  return (
    <div className="spotify-app">
      <header className="spotify-header">
        <div className="header-content">
          <h1 className="app-title">Music App</h1>
        </div>
      </header>

      <nav className="spotify-nav">
        <div className="nav-content">
          <button
            onClick={() => setActiveTab('artists')}
            className={`nav-button ${activeTab === 'artists' ? 'active' : ''}`}
          >
            🎤 Artists
          </button>
          <button
            onClick={() => setActiveTab('songs')}
            className={`nav-button ${activeTab === 'songs' ? 'active' : ''}`}
          >
            🎵 Songs
          </button>
          <button
            onClick={() => setActiveTab('albums')}
            className={`nav-button ${activeTab === 'albums' ? 'active' : ''}`}
          >
            💿 Albums
          </button>
          <button
            onClick={() => setActiveTab('playlists')}
            className={`nav-button ${activeTab === 'playlists' ? 'active' : ''}`}
          >
            🎶 Playlists
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`nav-button ${activeTab === 'users' ? 'active' : ''}`}
          >
            👤 Users
          </button>
        </div>
      </nav>

      <main className="spotify-main">
        {activeTab === 'artists' && <Artists />}
        {activeTab === 'songs' && <Songs />}
        {activeTab === 'albums' && <Albums />}
        {activeTab === 'playlists' && <Playlists />}
        {activeTab === 'users' && <Users />}
      </main>
    </div>
  );
}

export default App;
