"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Link,
  TextField,
} from "@heroui/react";
import { setAuthSession } from "../lib/auth";
import { ThemeToggle } from "../components/theme-toggle";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const usernameValue = (formData.get("username") ?? "").toString();
    const passwordValue = (formData.get("password") ?? "").toString();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        redirect: "manual",
        body: JSON.stringify({ username: usernameValue, password: passwordValue }),
      });

      if (response.ok || response.status === 301 || response.status === 302) {
        setAuthSession(usernameValue || "usuario");
        router.push("/");
        return;
      }

      setError("Credenciales incorrectas. Intenta de nuevo.");
    } catch (err) {
      setError("No se pudo conectar con el servidor. Verifica la conexion.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-0rem)] px-6 py-12">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col items-stretch">
        <Card className="gap-6 rounded-3xl" variant="default">
          <Card.Header className="gap-2">
            <Card.Title className="text-2xl">Iniciar sesion</Card.Title>
            <Card.Description>Usa tus credenciales institucionales.</Card.Description>
          </Card.Header>
          <Card.Content>
            <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <TextField
                isRequired
                name="username"
                autoComplete="username"
                validate={(value) => (value.length < 3 ? "El usuario es muy corto." : null)}
              >
                <Label>Usuario</Label>
                <Input placeholder="admin" />
                <FieldError />
              </TextField>
              <TextField
                isRequired
                minLength={6}
                name="password"
                type="password"
                autoComplete="current-password"
                validate={(value) => (value.length < 6 ? "Minimo 6 caracteres." : null)}
              >
                <Label>Contrasena</Label>
                <Input placeholder="••••••••" />
                <Description>Credencial institucional.</Description>
                <FieldError />
              </TextField>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <Button type="submit" isLoading={isLoading} className="w-full">
                Entrar al portal
              </Button>
            </Form>
          </Card.Content>
          <Card.Footer className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <Link href="/">Volver al inicio</Link>
            <span className="text-muted">Olvidaste tu contrasena? Contacta al admin.</span>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
