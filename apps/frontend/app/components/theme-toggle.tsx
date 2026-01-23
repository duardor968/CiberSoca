"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Button, ButtonGroup } from "@heroui/react";
import { Display, Moon, Sun } from "@gravity-ui/icons";
import {
  getResolvedThemeKey,
  getServerTheme,
  getStoredTheme,
  setStoredTheme,
  subscribeTheme,
  ThemeMode,
} from "../lib/theme";

const themeOptions: Array<{
  value: ThemeMode;
  label: string;
  Icon: typeof Sun;
}> = [
  { value: "light", label: "Tema claro", Icon: Sun },
  { value: "dark", label: "Tema oscuro", Icon: Moon },
  { value: "system", label: "Tema del sistema", Icon: Display },
];

export function ThemeToggle({ className }: { className?: string }) {
  const themeMode = useSyncExternalStore(subscribeTheme, getStoredTheme, getServerTheme);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const isDark = themeMode === "dark" || (themeMode === "system" && media?.matches);
      document.documentElement.classList.toggle("dark", Boolean(isDark));
      const resolved = isDark ? "dark" : "light";
      document.cookie = `${getResolvedThemeKey()}=${resolved}; path=/; max-age=31536000`;
    };

    applyTheme();

    if (themeMode === "system" && media?.addEventListener) {
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }

    return;
  }, [themeMode]);

  return (
    <ButtonGroup size="sm" variant="secondary" className={className}>
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
  );
}
