import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./admin.css";
export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (data.session) navigate("/admin/panel", { replace: true });
      })
      .catch(() =>
        setError("No se pudo comprobar la sesión. Intenta entrar de nuevo."),
      );
  }, [navigate]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      navigate("/admin/panel", { replace: true });
    } catch {
      setError(
        "No pudimos iniciar sesión. Revisa tu correo y contraseña e intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="works-admin">
      <header className="admin-top">
        <a href="/">OMNIIOUS</a>
        <a href="/proyectos">Ver obras ↗</a>
      </header>
      <main>
        <div className="admin-login">
          <p>Administración de obras</p>
          <h1>
            Tu portafolio,
            <br />
            en tus manos.
          </h1>
          <p>
            Sube fotos, actualiza tus proyectos y decide qué mostrar en la
            página.
          </p>
          {error && (
            <p className="admin-error" role="alert">
              {error}
            </p>
          )}
          <form onSubmit={submit}>
            <label>
              Correo electrónico
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button disabled={loading}>
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
