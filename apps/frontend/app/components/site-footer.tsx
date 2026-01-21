"use client";

import Image from "next/image";
import { Link, Separator } from "@heroui/react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white/70 px-1 py-10 text-sm text-muted dark:bg-black/60 sm:px-2" id="info">
      <div className="mx-auto grid w-full max-w-none gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="flex gap-4">
          <Image
            alt="NEXA"
            className="-my-1 h-11.25 w-auto dark:invert sm:h-12.5"
            height={280}
            src="/brand/logo.svg"
            width={900}
          />
          <div className="space-y-2">
            <p className="text-base font-semibold text-foreground">IPVCE Portal</p>
            <p>
              Plataforma academica para noticias, horarios y seguimiento
              institucional.
            </p>
            <Link href="#" className="text-xs">
              Politica de privacidad
              <Link.Icon />
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
            Mapa
          </p>
          <ul className="space-y-2">
            <li><Link href="#noticias">Noticias</Link></li>
            <li><Link href="#calendario">Calendario</Link></li>
            <li><Link href="#atajos">Atajos</Link></li>
            <li><Link href="#info">Informacion</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
            Soporte
          </p>
          <ul className="space-y-2">
            <li>Secretaria Academica</li>
            <li>Horario: 8:00 - 16:00</li>
            <li>Telefono: +53 00 000000</li>
            <li>soporte@ipvce.edu.cu</li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
            Comunidad
          </p>
          <ul className="space-y-2">
            <li>Reglamento interno</li>
            <li>Calendario general</li>
            <li>Guia para profesores</li>
          </ul>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="mx-auto flex w-full max-w-none flex-wrap items-center justify-between gap-3 px-1 text-xs sm:px-2">
        <span>Copyright © 2026 IPVCE</span>
        <span>CiberSoca - Version interna 0.0.1</span>
      </div>
    </footer>
  );
}
