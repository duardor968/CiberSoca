"use client";

import { Button, Card, Chip, Link, Separator, Surface } from "@heroui/react";

const stats = [
  { label: "Promedio", value: "86.4", note: "Ultimo trimestre" },
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
    description: "Convocatoria de sociedades cientificas abierta.",
  },
  {
    title: "Escalafon",
    description: "Top 10 actualizado por departamento.",
  },
];

const newsItems = [
  {
    tag: "Institucional",
    title: "Semana de sociedades cientificas",
    description: "Calendario general, jurados y lineamientos oficiales.",
  },
  {
    tag: "Eventos",
    title: "Simulacro de ingreso",
    description: "Cronograma por grupos y recursos disponibles.",
  },
  {
    tag: "Aviso",
    title: "Actualizacion de horario",
    description: "Nuevo bloque de matutino agregado en primer turno.",
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
    title: "Escalafon",
    description: "Ranking por aula con cortes y tendencia.",
  },
  {
    title: "Notas",
    description: "Historico por periodos y asignaturas.",
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
    title: "Reunion docente",
    description: "Planificacion del cierre de semestre.",
  },
  {
    date: "24",
    title: "Festival cientifico",
    description: "Exposiciones en el aula magna.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
      <section className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Surface className="flex flex-col gap-6 rounded-3xl p-8 shadow-lg" variant="tertiary">
          <Chip color="accent" variant="soft">
            IPVCE Preuniversitario
          </Chip>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Un portal claro para estudiar, informar y decidir.
            </h1>
            <p className="text-base text-muted sm:text-lg">
              Noticias, calendario, horarios y seguimiento academico en un solo lugar. Disenado
              para estudiantes, profesores y administracion.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Entrar al portal</Button>
            <Button variant="secondary">Ver calendario</Button>
            <Button variant="ghost">Explorar noticias</Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} className="gap-2" variant="secondary">
                <Card.Content className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                    {stat.label}
                  </span>
                  <span className="text-2xl font-semibold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted">{stat.note}</span>
                </Card.Content>
              </Card>
            ))}
          </div>
        </Surface>

        <Surface className="flex flex-col gap-6 rounded-3xl p-8" variant="secondary">
          <div className="space-y-2">
            <Chip variant="secondary">Vista rapida</Chip>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Panel institucional
            </h2>
            <p className="text-sm text-muted">
              Un resumen visual con prioridades del dia, accesos rapidos y estado academico
              general.
            </p>
          </div>
          <div className="grid gap-3">
            {highlights.map((item) => (
              <Card key={item.title} className="gap-1" variant="default">
                <Card.Header className="gap-2">
                  <Card.Title className="text-base">{item.title}</Card.Title>
                  <Card.Description>{item.description}</Card.Description>
                </Card.Header>
              </Card>
            ))}
          </div>
          <Separator />
          <div className="flex items-center justify-between text-sm text-muted">
            <span>Actualizado hoy</span>
            <Link href="#noticias">
              Ver tablero completo
              <Link.Icon />
            </Link>
          </div>
        </Surface>
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
        <div className="grid gap-4 md:grid-cols-3">
          {newsItems.map((item) => (
            <Card key={item.title} className="gap-2" variant="secondary">
              <Card.Header className="gap-2">
                <Chip size="sm" variant="soft">
                  {item.tag}
                </Chip>
                <Card.Title className="text-lg">{item.title}</Card.Title>
                <Card.Description>{item.description}</Card.Description>
              </Card.Header>
              <Card.Footer className="flex items-center justify-between">
                <span className="text-xs text-muted">Actualizado hoy</span>
                <Link href="#">
                  Leer mas
                  <Link.Icon />
                </Link>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </section>

      <section id="atajos" className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-semibold text-foreground">
            Accesos rapidos
          </h2>
          <p className="text-sm text-muted">
            Modulos clave para mantener todo ordenado desde el primer ingreso.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {quickAccess.map((item) => (
            <Card key={item.title} className="flex flex-col gap-3" variant="default">
              <Card.Header className="gap-2">
                <Card.Title className="text-lg">{item.title}</Card.Title>
                <Card.Description>{item.description}</Card.Description>
              </Card.Header>
              <Card.Footer>
                <Button size="sm" variant="secondary">
                  Abrir modulo
                </Button>
              </Card.Footer>
            </Card>
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
        <Surface className="flex flex-col gap-3 rounded-3xl p-6" variant="secondary">
          {calendarItems.map((item) => (
            <Card
              key={item.title}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              variant="transparent"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-default text-lg font-semibold text-foreground">
                  {item.date}
                </div>
                <div>
                  <Card.Title className="text-base">{item.title}</Card.Title>
                  <Card.Description>{item.description}</Card.Description>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                Ver detalles
              </Button>
            </Card>
          ))}
        </Surface>
      </section>
    </div>
  );
}
