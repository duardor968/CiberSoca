"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Kbd,
  Label,
  Link,
  SearchField,
  Switch,
} from "@heroui/react";

const REPO_URL = "https://github.com/duardor968/CiberSoca";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/70 backdrop-blur dark:bg-black/60">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#ff6b3d] to-[#2b6de9] shadow-lg" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">IPVCE</p>
            <p className="text-lg font-semibold text-foreground">Portal Educativo</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
          <Link href="#noticias">Noticias</Link>
          <Link href="#calendario">Calendario</Link>
          <Link href="#atajos">Atajos</Link>
          <Link href="#info">Informacion</Link>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <SearchField className="hidden md:flex" name="search" variant="secondary">
            <Label className="sr-only">Buscar</Label>
            <SearchField.Group className="h-10 rounded-full px-3">
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-[140px] bg-transparent text-sm md:w-[200px]"
                placeholder="Buscar"
              />
              <div className="hidden items-center gap-1 md:flex">
                <Kbd>
                  <Kbd.Abbr keyValue="ctrl" />
                </Kbd>
                <Kbd>
                  <Kbd.Content>K</Kbd.Content>
                </Kbd>
              </div>
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>

          <Button
            isIconOnly
            variant="secondary"
            aria-label="Repositorio"
            onPress={() => window.open(REPO_URL, "_blank", "noreferrer")}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 2c-5.52 0-10 4.48-10 10 0 4.41 2.87 8.15 6.84 9.47.5.09.68-.22.68-.48 0-.23-.01-.85-.01-1.67-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.9 1.54 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.02-2.68-.1-.26-.44-1.3.1-2.71 0 0 .84-.27 2.75 1.02a9.48 9.48 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.41.2 2.45.1 2.71.63.7 1.02 1.59 1.02 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
            </svg>
          </Button>

          <Switch
            aria-label="Cambiar tema"
            isSelected={theme === "dark"}
            onChange={(selected) => setTheme(selected ? "dark" : "light")}
          >
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch>

          <Button>Acceso</Button>
        </div>
      </div>
    </header>
  );
}
