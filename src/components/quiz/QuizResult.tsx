"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "17206943519";
const MEETING_LINK = "https://meetings-na2.hubspot.com/york-martinez";

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

const CALIENTE = new Set(["listo", "evaluando"]);

type EmpleadoRecomendado = {
  nombre: string;
  rol: string;
  linea: string;
  iniciales: string;
};

const empleadoPorArea: Record<string, EmpleadoRecomendado> = {
  clientes: {
    nombre: "Vera",
    rol: "Empleada Digital de Atención al Cliente",
    linea: "Responde, califica y agenda — nunca deja a un cliente esperando.",
    iniciales: "V",
  },
  ventas: {
    nombre: "Max",
    rol: "Empleado Digital de Ventas",
    linea: "Da seguimiento a cada lead hasta que responda o compre.",
    iniciales: "M",
  },
  admin: {
    nombre: "Nora",
    rol: "Empleada Digital de Administración",
    linea: "Organiza, factura y recuerda lo que se te olvida.",
    iniciales: "N",
  },
  contenido: {
    nombre: "Leo",
    rol: "Empleado Digital de Contenido",
    linea: "Crea y publica contenido constante sin que tú lo pienses.",
    iniciales: "L",
  },
};

function buildWhatsappLink(
  answers: Record<string, string>,
  name: string,
  empleado: EmpleadoRecomendado
) {
  const lines = [
    `Hola, soy ${name}. Acabo de hacer el Diagnóstico de Negocios IA en la web 👋`,
    "",
    `Tipo de negocio: ${negocioLabels[answers.negocio] ?? "—"}`,
    `Área que más tiempo me roba: ${areaLabels[answers.area] ?? "—"}`,
    `Horas semanales en tareas manuales: ${horasLabels[answers.horas] ?? "—"}`,
    `Lo primero que delegaría: ${delegarLabels[answers.delegar] ?? "—"}`,
    `Mi momento para invertir: ${inversionLabels[answers.inversion] ?? "—"}`,
    `Empleado Digital recomendado: ${empleado.nombre} (${empleado.rol})`,
    "",
    "Quiero ver mi plan de Empleado Digital IA.",
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function MeetingButton({ primary }: { primary: boolean }) {
  return (
    <motion.a
      href={MEETING_LINK}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: primary ? 1.04 : 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={
        primary
          ? "glow-purple block rounded-full bg-gradient-to-r from-purple-600 to-red-600 px-8 py-4 text-base font-semibold text-white sm:text-lg"
          : "block rounded-full border border-white/15 px-8 py-3.5 text-sm font-medium text-zinc-300 hover:border-white/30 hover:text-white"
      }
    >
      {primary ? "Agendar mi llamada (15 min) →" : "Prefiero agendar una llamada"}
    </motion.a>
  );
}

function WhatsappButton({
  primary,
  href,
}: {
  primary: boolean;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: primary ? 1.04 : 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={
        primary
          ? "glow-purple block rounded-full bg-gradient-to-r from-purple-600 to-red-600 px-8 py-4 text-base font-semibold text-white sm:text-lg"
          : "block rounded-full border border-white/15 px-8 py-3.5 text-sm font-medium text-zinc-300 hover:border-white/30 hover:text-white"
      }
    >
      {primary ? "Recibir mi diagnóstico por WhatsApp →" : "Prefiero escribirte por WhatsApp"}
    </motion.a>
  );
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
  const horas = horasLabels[answers.horas] ?? "varias horas a la semana";
  const delegar = delegarLabels[answers.delegar] ?? "tareas repetitivas";
  const empleado = empleadoPorArea[answers.area] ?? empleadoPorArea.clientes;
  const whatsappLink = buildWhatsappLink(answers, name, empleado);
  const mostrarLlamadaPrimero = CALIENTE.has(answers.inversion);

  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-red-600">
        <CheckCircle2 className="h-7 w-7 text-white" />
      </div>

      <h3 className="text-balance mt-6 text-2xl font-bold text-white sm:text-3xl">
        {name !== "Sin nombre" ? `${name}, este` : "Este"} es tu diagnóstico.
      </h3>

      <div className="glass mt-6 rounded-2xl p-5 text-left sm:p-6">
        <dl className="space-y-3 text-sm sm:text-base">
          <div>
            <dt className="text-zinc-500">Área principal de fuga de tiempo</dt>
            <dd className="font-semibold text-zinc-100">{area}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Horas perdidas estimadas por semana</dt>
            <dd className="font-semibold text-zinc-100">{horas}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">
              Primer rol recomendado para tu Empleado Digital
            </dt>
            <dd className="font-semibold text-zinc-100">{delegar}</dd>
          </div>
        </dl>
      </div>

      <div className="glow-purple mt-5 flex items-center gap-4 rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-600/15 to-red-600/10 p-5 text-left sm:p-6">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-red-500 text-lg font-bold text-white">
          {empleado.iniciales}
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-purple-300">
            Tu Empleado Digital recomendado
          </p>
          <p className="mt-0.5 text-lg font-bold text-white">
            {empleado.nombre} <span className="text-zinc-400 font-normal">— {empleado.rol}</span>
          </p>
          <p className="mt-1 text-sm text-zinc-300">{empleado.linea}</p>
        </div>
      </div>

      <p className="mt-5 text-balance leading-relaxed text-zinc-400">
        Te preparo un diagnóstico personalizado y te lo envío por WhatsApp. Si
        quieres, también podemos ver juntos cómo se vería {empleado.nombre} en
        una llamada de 15 minutos.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {mostrarLlamadaPrimero ? (
          <>
            <MeetingButton primary />
            <WhatsappButton href={whatsappLink} primary={false} />
          </>
        ) : (
          <>
            <WhatsappButton href={whatsappLink} primary />
            <MeetingButton primary={false} />
          </>
        )}
      </div>

      <button
        onClick={onRestart}
        className="mt-4 block w-full text-sm text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline"
      >
        Volver a hacer el diagnóstico
      </button>
    </div>
  );
}
