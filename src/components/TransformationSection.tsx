"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

export default function TransformationSection({
  onStart,
}: {
  onStart: () => void;
}) {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">
            Un Empleado Digital no descansa.
            <br />
            Tú sí.
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="mt-6 text-balance text-lg leading-relaxed text-zinc-400">
            No instalamos IA. Instalamos un sistema que trabaja por ti 24/7:
            responde, organiza, agenda y ejecuta lo repetitivo, mientras tú
            vuelves a ser el director de tu negocio — no su empleado más
            ocupado.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="glow-purple mt-10 rounded-full bg-gradient-to-r from-purple-600 to-red-600 px-8 py-4 text-base font-semibold text-white sm:text-lg"
          >
            Quiero hacer mi diagnóstico y recuperar mi tiempo →
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}
