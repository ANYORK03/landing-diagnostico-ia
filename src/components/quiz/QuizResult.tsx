"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "17206943519";

const areaLabels: Record<string, string> = {
  clientes: "atención a clientes",
  ventas: "ventas y seguimiento",
  admin: "administración",
  contenido: "contenido y redes",
};

const horasLabels: Record<string, string> = {
  "menos-5": "menos de 5 horas/semana",
  "5-15": "5 a 15 horas/semana",
  "15-30": "15 a 30 horas/semana",
  "mas-30": "más de 30 horas/semana",
};

const delegarLabels: Record<string, string> = {
  responder: "responder y calificar clientes",
  agendar: "agendar citas y seguimientos",
  organizar: "organizar información del negocio",
  crear: "crear y publicar contenido",
};

const inversionLabels: Record<string, string> = {
  listo: "listo para empezar ya",
  evaluando: "evaluando opciones este mes",
  curioso: "curioso, explorando aún",
  viendo: "solo viendo qué existe",
};

const negocioLabels: Record<string, string> = {
  restaurante: "Restaurante o comida",
  tienda: "Tienda o e-commerce",
  servicios: "Servicios profesionales",
  "salud-belleza": "Salud o belleza",
  otro: "Otro",
};

function buildWhatsappLink(answers: Record<string, string>, name: string) {
  const lines = [
    `Hola, soy ${name}. Acabo de hacer el Diagnóstico de Negocios IA en la web 👋`,
    "",
    `Tipo de negocio: ${negocioLabels[answers.negocio] ?? "—"}`,
    `Área que más tiempo me roba: ${areaLabels[answers.area] ?? "—"}`,
    `Horas semanales en tareas manuales: ${horasLabels[answers.horas] ?? "—"}`,
    `Lo primero que delegaría: ${delegarLabels[answers.delegar] ?? "—"}`,
    `Mi momento para invertir: ${inversionLabels[answers.inversion] ?? "—"}`,
    "",
    "Quiero ver mi plan de Empleado Digital IA.",
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function QuizResult({
  answers,
  name,
  onRestart,
}: {
  answers: Record<string, string>;
  name: string;
  onRestart: () => void;
}) {
  const area = areaLabels[answers.area] ?? "tu operación diaria";
  const whatsappLink = buildWhatsappLink(answers, name);

  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-red-600">
        <CheckCircle2 className="h-7 w-7 text-white" />
      </div>

      <h3 className="text-balance mt-6 text-2xl font-bold text-white sm:text-3xl">
        {name !== "Sin nombre" ? `${name}, tu` : "Tu"} negocio ya está listo
        para un Empleado Digital.
      </h3>

      <p className="mt-4 text-balance leading-relaxed text-zinc-400">
        Según tus respuestas, el mayor punto de fuga de tiempo está en{" "}
        <span className="font-semibold text-zinc-200">{area}</span>. Eso es
        exactamente lo que un Empleado Digital IA puede asumir por ti desde
        la primera semana.
      </p>

      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
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
