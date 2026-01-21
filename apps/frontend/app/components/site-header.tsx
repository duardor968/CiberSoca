"use client";

import { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  Button,
  ButtonGroup,
  Kbd,
  Label,
  Link,
  SearchField,
} from "@heroui/react";
import { Display, Moon, Sun } from "@gravity-ui/icons";

const REPO_URL = "https://github.com/duardor968/CiberSoca";

type ThemeMode = "light" | "dark" | "system";

const THEME_KEY = "theme";
const themeListeners = new Set<() => void>();

const getStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "dark" || stored === "light" || stored === "system"
    ? stored
    : "system";
};

const getServerTheme = () => "system";

const subscribeTheme = (listener: () => void) => {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
};

const setStoredTheme = (value: ThemeMode) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_KEY, value);
  themeListeners.forEach((listener) => listener());
};

const themeOptions: Array<{
  value: ThemeMode;
  label: string;
  Icon: typeof Sun;
}> = [
  { value: "light", label: "Tema claro", Icon: Sun },
  { value: "dark", label: "Tema oscuro", Icon: Moon },
  { value: "system", label: "Tema del sistema", Icon: Display },
];

export function SiteHeader() {
  const themeMode = useSyncExternalStore(subscribeTheme, getStoredTheme, getServerTheme);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const isDark =
        themeMode === "dark" ||
        (themeMode === "system" && media?.matches);
      document.documentElement.classList.toggle("dark", Boolean(isDark));
    };

    applyTheme();
    window.localStorage.setItem(THEME_KEY, themeMode);

    if (themeMode === "system" && media?.addEventListener) {
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }
    return;
  }, [themeMode]);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-white/70 backdrop-blur dark:bg-black/60">
      <div className="mx-auto flex h-full w-full max-w-none flex-nowrap items-center justify-between gap-4 px-1 sm:px-2">
        <div className="flex items-center gap-3">
          <Image
            alt="CiberSoca"
            className="-my-1 h-11.25 w-auto dark:invert sm:h-12.5"
            height={280}
            priority
            src="/brand/logo.svg"
            width={900}
          />
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
                className="w-35 bg-transparent text-sm md:w-50"
                placeholder="Buscar"
              />
              <div className="hidden md:flex">
                <Kbd className="gap-1">
                  <Kbd.Abbr keyValue="command" />
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

          <ButtonGroup size="sm" variant="secondary">
            {themeOptions.map(({ value, label, Icon }) => (
              <Button
                key={value}
                isIconOnly
                aria-label={label}
                aria-pressed={themeMode === value}
                className={themeMode === value ? "bg-default text-foreground" : "text-muted"}
                onPress={() => setStoredTheme(value)}
              >
                <Icon className="size-4" />
              </Button>
            ))}
          </ButtonGroup>

          <Button>Acceso</Button>
        </div>
      </div>
    </header>
  );
}
