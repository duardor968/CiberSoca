"use client";

import { useEffect, useState } from "react";

const REPO_URL = "https://github.com/duardor968/CiberSoca";

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      document.documentElement.classList.toggle("theme-dark", stored === "dark");
      return;
    }
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const next = prefersDark ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("theme-dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("theme-dark", next === "dark");
    window.localStorage.setItem("theme", next);
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="brand-title">IPVCE</p>
            <p className="brand-subtitle">Portal Educativo</p>
          </div>
        </div>

        <nav className="site-nav" aria-label="Principal">
          <a href="#noticias">Noticias</a>
          <a href="#calendario">Calendario</a>
          <a href="#atajos">Atajos</a>
          <a href="#info">Informacion</a>
        </nav>

        <div className="site-actions">
          <label className="search-pill">
            <span className="search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </span>
            <input type="search" placeholder="Buscar" />
            <span className="search-key">CTRL K</span>
          </label>

          <a className="icon-button" href={REPO_URL} target="_blank" rel="noreferrer">
            <span className="sr-only">Repositorio</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 2c-5.52 0-10 4.48-10 10 0 4.41 2.87 8.15 6.84 9.47.5.09.68-.22.68-.48 0-.23-.01-.85-.01-1.67-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.9 1.54 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.02-2.68-.1-.26-.44-1.3.1-2.71 0 0 .84-.27 2.75 1.02a9.48 9.48 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.41.2 2.45.1 2.71.63.7 1.02 1.59 1.02 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
            </svg>
          </a>

          <button className="icon-button" type="button" onClick={toggleTheme}>
            <span className="sr-only">Cambiar tema</span>
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 4.5a1 1 0 0 1 1-1h.01a1 1 0 0 1 1 1V7a1 1 0 0 1-1 1H13a1 1 0 0 1-1-1V4.5Zm0 12a1 1 0 0 1 1-1h.01a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H13a1 1 0 0 1-1-1v-2.5ZM4.5 11a1 1 0 0 1 1-1H8a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V11Zm12 0a1 1 0 0 1 1-1H19a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-2.5a1 1 0 0 1-1-1V11Zm-9.2-5.3a1 1 0 0 1 1.4 0l.01.01a1 1 0 0 1 0 1.4l-1.4 1.4a1 1 0 0 1-1.42-1.42l1.41-1.4Zm8.49 8.48a1 1 0 0 1 1.4 0l.02.02a1 1 0 0 1 0 1.4l-1.4 1.4a1 1 0 1 1-1.42-1.42l1.4-1.4ZM6.3 17.7a1 1 0 0 1 1.4-1.4l1.4 1.4A1 1 0 0 1 7.7 19l-1.4-1.3Zm8.5-8.5a1 1 0 0 1 1.4-1.4l1.4 1.4a1 1 0 1 1-1.42 1.42l-1.38-1.42ZM12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12.3 4.7a.8.8 0 0 1 1.2-.72 7.5 7.5 0 1 1-9.07 9.07.8.8 0 0 1 .72-1.2 6 6 0 0 0 7.13-7.15Z" />
              </svg>
            )}
          </button>

          <button className="ghost-button" type="button">
            Acceso
          </button>
        </div>
      </div>
    </header>
  );
}
