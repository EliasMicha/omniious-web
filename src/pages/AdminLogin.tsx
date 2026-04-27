import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) navigate('/admin/panel', { replace: true });
    })();
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate('/admin/panel', { replace: true });
  }

  return (
    <>
      <Nav />
      <div className="admin">
        <div className="login-card">
          <h1 style={{ fontSize: 28, marginBottom: 24 }}>Admin</h1>
          {error && <div className="error">{error}</div>}
          <form onSubmit={onSubmit}>
            <label>Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label>Contraseña</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
