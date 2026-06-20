"use client";

import { Flame, RotateCcw, Clock } from "lucide-react";
import FadeIn from "./FadeIn";

const pains = [
  {
    icon: Flame,
    title: "Apagando incendios",
    description:
      "Tu día se va resolviendo lo urgente, no lo importante. El negocio te maneja a ti.",
  },
  {
    icon: RotateCcw,
    title: "Trabajo repetitivo",
    description:
      "Respondes los mismos mensajes, llenas las mismas hojas, haces lo mismo cada semana.",
  },
  {
    icon: Clock,
    title: "Cero tiempo libre",
    description:
      "Eres el empleado más caro y más cansado de tu propia empresa. Sin horario de salida.",
  },
];

export default function PainSection() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <h2 className="text-balance text-center text-3xl font-bold text-white sm:text-4xl">
            ¿Te suena familiar?
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {pains.map((pain, i) => (
            <FadeIn key={pain.title} delay={i * 0.12}>
              <div className="glass h-full rounded-2xl p-7 transition-colors hover:bg-white/[0.06]">
                <pain.icon className="h-7 w-7 text-purple-400" strokeWidth={1.5} />
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {pain.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {pain.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
