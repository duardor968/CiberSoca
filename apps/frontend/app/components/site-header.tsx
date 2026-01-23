"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AlertDialog,
  Avatar,
  Button,
  Dropdown,
  Kbd,
  Label,
  Link,
  SearchField,
} from "@heroui/react";
import { ArrowRightFromSquare, Gear, Person } from "@gravity-ui/icons";
import { clearAuthSession, getAuthUser, isLoggedIn, AUTH_EVENT } from "../lib/auth";
import { ThemeToggle } from "./theme-toggle";

const REPO_URL = "https://github.com/duardor968/CiberSoca";

export function SiteHeader() {
  const [authState, setAuthState] = useState(() => ({
    isLoggedIn: false,
    username: null as string | null,
  }));
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  useEffect(() => {
    const updateAuthState = () => {
      setAuthState({
        isLoggedIn: isLoggedIn(),
        username: getAuthUser(),
      });
    };

    updateAuthState();
    window.addEventListener(AUTH_EVENT, updateAuthState);
    window.addEventListener("storage", updateAuthState);

    return () => {
      window.removeEventListener(AUTH_EVENT, updateAuthState);
      window.removeEventListener("storage", updateAuthState);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      setLogoutError("No se pudo cerrar la sesión. Intenta nuevamente.");
    } finally {
      clearAuthSession();
      setIsLoggingOut(false);
      window.location.assign("/");
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-white/70 backdrop-blur dark:bg-black/60">
      <div className="mx-auto flex h-full w-full max-w-none flex-nowrap items-center justify-between gap-4 px-4 sm:px-5">
        <div className="flex items-center gap-3">
          <Image
            alt="NEXA"
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

          <ThemeToggle />

          {authState.isLoggedIn ? (
            <Dropdown>
              <Dropdown.Trigger className="rounded-full">
                <Avatar>
                  <Avatar.Image
                    alt={authState.username ?? "Usuario"}
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                  />
                  <Avatar.Fallback delayMs={600}>
                    {(authState.username ?? "U").slice(0, 2).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>
              <Dropdown.Popover className="min-w-60 -translate-x-2">
                <div className="px-3 pt-3 pb-1">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <Avatar.Image
                        alt={authState.username ?? "Usuario"}
                        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                      />
                      <Avatar.Fallback delayMs={600}>
                        {(authState.username ?? "U").slice(0, 2).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                      <p className="text-sm font-medium leading-5">Sesión activa</p>
                      <p className="text-xs leading-none text-muted">
                        {authState.username ?? "usuario@ipvc.edu"}
                      </p>
                    </div>
                  </div>
                </div>
                <Dropdown.Menu onAction={(key) => key === "logout" && setIsLogoutOpen(true)}>
                  <Dropdown.Item id="dashboard" textValue="Dashboard">
                    <Label>Panel</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="profile" textValue="Profile">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Perfil</Label>
                      <Person className="size-3.5 text-muted" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item id="settings" textValue="Settings">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Configuración</Label>
                      <Gear className="size-3.5 text-muted" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Cerrar sesión</Label>
                      <ArrowRightFromSquare className="size-3.5 text-danger" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <Button onPress={() => window.location.assign("/login")}>Acceso</Button>
          )}
        </div>
      </div>
      <AlertDialog>
        <AlertDialog.Backdrop isOpen={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>¿Cerrar sesión?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>Vas a salir del portal y deberás iniciar sesión de nuevo.</p>
                {logoutError ? (
                  <p className="mt-2 text-sm text-danger">{logoutError}</p>
                ) : null}
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancelar
                </Button>
                <Button
                  slot="close"
                  variant="danger"
                  isLoading={isLoggingOut}
                  onPress={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </header>
  );
}
