"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

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

const horasSemanaEstimado: Record<string, number> = {
  "menos-5": 4,
  "5-15": 10,
  "15-30": 22,
  "mas-30": 35,
};

const horasScore: Record<string, number> = {
  "menos-5": 1,
  "5-15": 2,
  "15-30": 3,
  "mas-30": 4,
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

const inversionScore: Record<string, number> = {
  listo: 4,
  evaluando: 3,
  curioso: 2,
  viendo: 1,
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

type Urgencia = {
  nivel: "Alta" | "Media" | "Baja";
  porcentaje: number;
  color: string;
  mensaje: string;
};

function calcularUrgencia(answers: Record<string, string>): Urgencia {
  const score =
    (horasScore[answers.horas] ?? 1) + (inversionScore[answers.inversion] ?? 1);
  const porcentaje = Math.round((score / 8) * 100);

  if (score >= 6) {
    return {
      nivel: "Alta",
      porcentaje,
      color: "from-red-500 to-orange-400",
      mensaje: "Esto te está costando dinero cada semana que pasa.",
    };
  }
  if (score >= 4) {
    return {
      nivel: "Media",
      porcentaje,
      color: "from-yellow-400 to-orange-400",
      mensaje: "Vale la pena resolverlo este mes, antes de que crezca.",
    };
  }
  return {
    nivel: "Baja",
    porcentaje,
    color: "from-emerald-400 to-teal-400",
    mensaje: "Hay margen, pero ya identificaste el problema — no lo dejes pasar.",
  };
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 900;
    let frame = 0;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{display}</>;
}

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
  const urgencia = calcularUrgencia(answers);
  const horasMes = Math.round((horasSemanaEstimado[answers.horas] ?? 8) * 4.3);

  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-red-600">
        <CheckCircle2 className="h-7 w-7 text-white" />
      </div>

      <h3 className="text-balance mt-6 text-2xl font-bold text-white sm:text-3xl">
        {name !== "Sin nombre" ? `${name}, este` : "Este"} es tu diagnóstico.
      </h3>

      {/* Hero: número animado de horas perdidas al mes */}
      <div className="glow-purple mt-6 rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-600/15 to-red-600/10 p-6 sm:p-7">
        <p className="text-xs uppercase tracking-wider text-purple-300">
          Estás perdiendo aproximadamente
        </p>
        <p className="mt-1 text-5xl font-extrabold text-white sm:text-6xl">
          <AnimatedNumber value={horasMes} />
          <span className="text-2xl font-bold text-zinc-300 sm:text-3xl"> hrs/mes</span>
        </p>
        <p className="mt-1 text-sm text-zinc-300">
          en <span className="font-semibold text-zinc-100">{area}</span> — tiempo
          que tu negocio te está cobrando cada mes.
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          Si valoras tu hora en $30, son{" "}
          <span className="font-semibold text-zinc-200">
            ${(horasMes * 30).toLocaleString("en-US")} al mes
          </span>{" "}
          que se van en tareas repetitivas.
        </p>

        {/* Barra de urgencia */}
        <div className="mt-5 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-zinc-300">
              Nivel de urgencia: {urgencia.nivel}
            </span>
            <span className="text-zinc-500">{urgencia.porcentaje}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${urgencia.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${urgencia.porcentaje}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
          </div>
          <p className="mt-2 text-sm text-zinc-300">{urgencia.mensaje}</p>
        </div>
      </div>

      {/* Empleado Digital recomendado */}
      <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left sm:p-6">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-red-500 text-lg font-bold text-white">
          {empleado.iniciales}
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-purple-300">
            Tu Empleado Digital recomendado
          </p>
          <p className="mt-0.5 text-lg font-bold text-white">
            {empleado.nombre}{" "}
            <span className="font-normal text-zinc-400">— {empleado.rol}</span>
          </p>
          <p className="mt-1 text-sm text-zinc-300">{empleado.linea}</p>
        </div>
      </div>

      {/* Detalle del diagnóstico */}
      <div className="glass mt-4 rounded-2xl p-5 text-left sm:p-6">
        <dl className="space-y-3 text-sm sm:text-base">
          <div>
            <dt className="text-zinc-500">Horas reportadas</dt>
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
