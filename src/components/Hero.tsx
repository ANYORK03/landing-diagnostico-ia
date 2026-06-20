"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-700/30 via-fuchsia-600/10 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] right-[-10%] h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-red-700/20 to-transparent blur-3xl"
      />

      <FadeIn>
        <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-zinc-300">
          Digital Anyork LLC
        </span>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 className="text-balance max-w-4xl text-4xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
          Dejaste de ser dueño de tu negocio.
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-red-300 bg-clip-text text-transparent">
            Ahora eres su empleado.
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.22}>
        <p className="mt-6 max-w-xl text-balance text-lg text-zinc-400 sm:text-xl">
          Sistemas antes que esfuerzo. Director antes que operador. Descubre
          en 60 segundos qué tareas puede asumir hoy un Empleado Digital IA.
        </p>
      </FadeIn>

      <FadeIn delay={0.34}>
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="glow-purple mt-10 rounded-full bg-gradient-to-r from-purple-600 to-red-600 px-8 py-4 text-base font-semibold text-white transition-shadow hover:shadow-[0_0_80px_-5px_rgba(168,85,247,0.6)] sm:text-lg"
        >
          Hacer mi Diagnóstico Gratis →
        </motion.button>
      </FadeIn>

      <FadeIn delay={0.42}>
        <p className="mt-4 text-sm text-zinc-500">
          Sin tarjeta. Sin clases de IA. Solo respuestas.
        </p>
      </FadeIn>
    </section>
  );
}
