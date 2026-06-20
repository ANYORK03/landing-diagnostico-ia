"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const areaLabels: Record<string, string> = {
  clientes: "atención a clientes",
  ventas: "ventas y seguimiento",
  admin: "administración",
  contenido: "contenido y redes",
};

export default function QuizResult({
  answers,
  onRestart,
}: {
  answers: Record<string, string>;
  onRestart: () => void;
}) {
  const area = areaLabels[answers.area] ?? "tu operación diaria";

  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-red-600">
        <CheckCircle2 className="h-7 w-7 text-white" />
      </div>

      <h3 className="text-balance mt-6 text-2xl font-bold text-white sm:text-3xl">
        Tu negocio ya está listo para un Empleado Digital.
      </h3>

      <p className="mt-4 text-balance leading-relaxed text-zinc-400">
        Según tus respuestas, el mayor punto de fuga de tiempo está en{" "}
        <span className="font-semibold text-zinc-200">{area}</span>. Eso es
        exactamente lo que un Empleado Digital IA puede asumir por ti desde
        la primera semana.
      </p>

      <motion.a
        href="#contacto"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="glow-purple mt-8 inline-block rounded-full bg-gradient-to-r from-purple-600 to-red-600 px-8 py-4 text-base font-semibold text-white sm:text-lg"
      >
        Ver mi plan de sistema IA →
      </motion.a>

      <button
        onClick={onRestart}
        className="mt-4 block w-full text-sm text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline"
      >
        Volver a hacer el diagnóstico
      </button>
    </div>
  );
}
