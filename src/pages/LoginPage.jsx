import { getLoginUrl } from "../api/authApi";
import "./LoginPage.css";

export function LoginPage() {
  return (
    <main className="page">
      <div className="login-panel">
        <p className="eyebrow">Media Scheduler</p>
        <h1>Sign in</h1>
        <p className="login-description">
          Access your personal TV schedule. Sign in with Google to get started.
        </p>
        <a href={getLoginUrl()} className="google-btn">
          Continue with Google
        </a>
      </div>
    </main>
  );
}
