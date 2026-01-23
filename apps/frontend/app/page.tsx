"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, Chip, Link, Separator, Skeleton, Surface } from "@heroui/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  summary?: string | null;
  publishedAt?: string | null;
};

const stats = [
  { label: "Promedio", value: "86.4", note: "Último trimestre" },
  { label: "Avisos", value: "6", note: "Esta semana" },
  { label: "Calendarios", value: "4", note: "Activos ahora" },
];

const highlights = [
  {
    title: "Grupo 12mo4",
    description: "Horario ajustado por matutino y laboratorios.",
  },
  {
    title: "Noticias",
    description: "Convocatoria de sociedades científicas abierta.",
  },
  {
    title: "Escalafón",
    description: "Top 10 actualizado por departamento.",
  },
];

const quickAccess = [
  {
    title: "Calendario del mes",
    description: "Eventos institucionales y por grupo.",
  },
  {
    title: "Horario",
    description: "Turnos personalizables, aulas y docentes.",
  },
  {
    title: "Escalafón",
    description: "Ranking por aula con cortes y tendencia.",
  },
  {
    title: "Notas",
    description: "Histórico por periodos y asignaturas.",
  },
];

const calendarItems = [
  {
    date: "14",
    title: "Entrega de proyectos",
    description: "Cierre de postulaciones internas.",
  },
  {
    date: "18",
    title: "Reunión docente",
    description: "Planificación del cierre de semestre.",
  },
  {
    date: "24",
    title: "Festival científico",
    description: "Exposiciones en el aula magna.",
  },
];

const NEWS_QUERY = `
  query News($take: Int) {
    news(take: $take) {
      id
      title
      slug
      summary
      publishedAt
    }
  }
`;

const formatDate = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat("es", { dateStyle: "medium" }).format(date);
};

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/graphql`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ query: NEWS_QUERY, variables: { take: 4 } }),
        });

        const result = await response.json();

        if (!response.ok || result.errors) {
          throw new Error("No se pudieron cargar las noticias.");
        }

        if (isMounted) {
          setNews(result.data?.news ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setError("No se pudieron cargar las noticias.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredNews = useMemo(() => news[0], [news]);
  const secondaryNews = useMemo(() => news.slice(1, 4), [news]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
      <section className="grid items-start gap-10">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Un portal claro para estudiar, informar y decidir.
            </h1>
            <p className="text-base text-muted sm:text-lg">
              Noticias, calendario, horarios y seguimiento académico en un solo lugar. Diseñado
              para estudiantes, profesores y administración.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Entrar al portal</Button>
            <Button variant="secondary">Ver calendario</Button>
            <Button variant="ghost">Explorar noticias</Button>
          </div>
          <div className="grid gap-3 rounded-2xl border border-border/60 bg-white/60 p-4 text-sm text-muted shadow-sm dark:bg-black/20">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                Resumen rápido
              </span>
              <span className="text-xs">Actualizado hoy</span>
            </div>
            <Separator />
            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">{stat.label}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 rounded-2xl border border-border/60 bg-white/60 p-4 text-sm text-muted shadow-sm dark:bg-black/20 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-default text-sm font-semibold text-foreground">
                  0{index + 1}
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="noticias" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-semibold text-foreground">
              Noticias principales
            </h2>
            <p className="text-sm text-muted">
              Comunicados oficiales y avisos de alto impacto para toda la comunidad.
            </p>
          </div>
          <Button variant="tertiary">Ver todas</Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4 rounded-3xl border border-border/60 bg-white/60 p-6 shadow-sm dark:bg-black/30">
              <Skeleton className="h-5 w-24 rounded-lg" />
              <Skeleton className="h-8 w-4/5 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/5 rounded-lg" />
            </div>
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`news-skeleton-${index}`}
                  className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-sm dark:bg-black/30"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-20 rounded-lg" />
                    <Skeleton className="h-4 w-16 rounded-lg" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                    <Skeleton className="h-4 w-full rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <Surface className="rounded-3xl p-6 text-sm text-danger" variant="secondary">
            {error}
          </Surface>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {featuredNews ? (
              <Card className="gap-3" variant="secondary">
                <Card.Header className="gap-3">
                  <Chip size="sm" variant="soft">
                    Institucional
                  </Chip>
                  <Card.Title className="text-2xl">{featuredNews.title}</Card.Title>
                  <Card.Description>
                    {featuredNews.summary ?? "Sin resumen disponible."}
                  </Card.Description>
                </Card.Header>
                <Card.Footer className="flex items-center justify-between">
                  <span className="text-xs text-muted">
                    {formatDate(featuredNews.publishedAt)}
                  </span>
                  <Link href="#">
                    Leer más
                    <Link.Icon />
                  </Link>
                </Card.Footer>
              </Card>
            ) : (
              <Surface className="rounded-3xl p-6 text-sm text-muted" variant="secondary">
                No hay noticias publicadas.
              </Surface>
            )}
            <div className="flex flex-col gap-4">
              {secondaryNews.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-sm dark:bg-black/30"
                >
                  <div className="flex items-center justify-between">
                    <Chip size="sm" variant="soft">
                      Institucional
                    </Chip>
                    <span className="text-xs text-muted">{formatDate(item.publishedAt)}</span>
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-base font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted">
                      {item.summary ?? "Sin resumen disponible."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section id="atajos" className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-semibold text-foreground">Accesos rápidos</h2>
          <p className="text-sm text-muted">
            Módulos clave para mantener todo ordenado desde el primer ingreso.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {quickAccess.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/70 px-4 py-3 shadow-sm dark:bg-black/30"
            >
              <div>
                <p className="text-base font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted">{item.description}</p>
              </div>
              <Button size="sm" variant="secondary">
                Abrir módulo
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section id="calendario" className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-semibold text-foreground">
            Calendario institucional
          </h2>
          <p className="text-sm text-muted">
            Vista simple para revisar lo urgente sin saturar el inicio.
          </p>
        </div>
        <Surface className="flex flex-col gap-5 rounded-3xl p-6" variant="secondary">
          {calendarItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-default text-lg font-semibold text-foreground">
                  {item.date}
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                Ver detalles
              </Button>
            </div>
          ))}
        </Surface>
      </section>
    </div>
  );
}
