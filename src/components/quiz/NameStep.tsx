"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function NameStep({
  onSubmit,
}: {
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(name.trim() || "Sin nombre");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-balance mb-2 text-xl font-semibold text-white sm:text-2xl">
        Última pregunta. ¿Cómo te llamas?
      </h3>
      <p className="mb-6 text-sm text-zinc-400">
        Para que tu plan llegue a tu nombre, no al genérico.
      </p>
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        className="glass w-full rounded-xl px-6 py-5 text-base text-white placeholder:text-zinc-500 focus:border-purple-400/40 focus:outline-none sm:text-lg"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glow-purple mt-4 w-full rounded-full bg-gradient-to-r from-purple-600 to-red-600 px-8 py-4 text-base font-semibold text-white sm:text-lg"
      >
        Ver mi diagnóstico →
      </motion.button>
    </form>
  );
}
