"use client";

import { motion } from "framer-motion";

export default function Footer({ onStart }: { onStart: () => void }) {
  return (
    <footer id="contacto" className="border-t border-white/10 px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <h2 className="text-balance text-2xl font-bold text-white sm:text-3xl">
          Sistemas antes que esfuerzo.
        </h2>
        <p className="max-w-md text-zinc-400">
          Digital Anyork LLC instala empleados digitales para que vuelvas a
          ser el director de tu negocio.
        </p>
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="glow-purple rounded-full bg-gradient-to-r from-purple-600 to-red-600 px-8 py-4 text-base font-semibold text-white"
        >
          Empezar mi Diagnóstico →
        </motion.button>

        <div className="mt-10 flex w-full flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Digital Anyork LLC. Todos los derechos reservados.</span>
          <span>Tu Primer Empleado IA</span>
        </div>
      </div>
    </footer>
  );
}
