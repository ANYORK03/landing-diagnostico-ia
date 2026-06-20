export type QuizOption = {
  label: string;
  value: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "area",
    question: "¿Cuál es el área que más tiempo te roba hoy en tu negocio?",
    options: [
      { label: "Responder clientes y mensajes", value: "clientes" },
      { label: "Ventas y seguimiento de leads", value: "ventas" },
      { label: "Administración y papeleo", value: "admin" },
      { label: "Contenido y redes sociales", value: "contenido" },
    ],
  },
  {
    id: "horas",
    question:
      "¿Cuántas horas a la semana calculas que pasas haciendo tareas manuales?",
    options: [
      { label: "Menos de 5 horas", value: "menos-5" },
      { label: "Entre 5 y 15 horas", value: "5-15" },
      { label: "Entre 15 y 30 horas", value: "15-30" },
      { label: "Más de 30 horas", value: "mas-30" },
    ],
  },
  {
    id: "delegar",
    question:
      "Si hoy tuvieras un Empleado Digital 24/7, ¿qué le delegarías primero?",
    options: [
      { label: "Responder y calificar clientes", value: "responder" },
      { label: "Agendar citas y seguimientos", value: "agendar" },
      { label: "Organizar información del negocio", value: "organizar" },
      { label: "Crear y publicar contenido", value: "crear" },
    ],
  },
  {
    id: "inversion",
    question: "¿En qué punto te encuentras para invertir en sistemas?",
    options: [
      { label: "Listo para empezar ya", value: "listo" },
      { label: "Evaluando opciones este mes", value: "evaluando" },
      { label: "Curioso, explorando aún", value: "curioso" },
      { label: "Solo viendo qué existe", value: "viendo" },
    ],
  },
  {
    id: "negocio",
    question: "¿Qué tipo de negocio tienes?",
    options: [
      { label: "Restaurante o comida", value: "restaurante" },
      { label: "Tienda o e-commerce", value: "tienda" },
      { label: "Servicios profesionales", value: "servicios" },
      { label: "Salud o belleza", value: "salud-belleza" },
      { label: "Otro", value: "otro" },
    ],
  },
];
