import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) {
    return NextResponse.json({ skipped: true }, { status: 200 });
  }

  const body = await req.json();
  const { name, answers } = body as {
    name: string;
    answers: Record<string, string>;
  };

  const notes = [
    `Tipo de negocio: ${negocioLabels[answers.negocio] ?? "—"}`,
    `Área que más tiempo le roba: ${areaLabels[answers.area] ?? "—"}`,
    `Horas semanales en tareas manuales: ${horasLabels[answers.horas] ?? "—"}`,
    `Lo primero que delegaría: ${delegarLabels[answers.delegar] ?? "—"}`,
    `Momento para invertir: ${inversionLabels[answers.inversion] ?? "—"}`,
  ].join("\n");

  const [firstname, ...rest] = (name || "Sin nombre").trim().split(" ");
  const lastname = rest.join(" ") || undefined;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const contactResponse = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          properties: {
            firstname,
            lastname,
            lifecyclestage: "lead",
            hs_lead_status: "NEW",
            company: negocioLabels[answers.negocio] ?? undefined,
          },
        }),
      }
    );

    if (!contactResponse.ok) {
      const errorBody = await contactResponse.text();
      console.error("HubSpot contact error", contactResponse.status, errorBody);
      return NextResponse.json(
        { ok: false, status: contactResponse.status },
        { status: 200 }
      );
    }

    const contact = await contactResponse.json();
    const contactId = contact.id;

    const noteResponse = await fetch(
      "https://api.hubapi.com/crm/v3/objects/notes",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          properties: {
            hs_note_body: `Diagnóstico de Negocios IA — ${name}\n\n${notes}`,
            hs_timestamp: Date.now(),
          },
          associations: [
            {
              to: { id: contactId },
              types: [
                {
                  associationCategory: "HUBSPOT_DEFINED",
                  associationTypeId: 202,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!noteResponse.ok) {
      const errorBody = await noteResponse.text();
      console.error("HubSpot note error", noteResponse.status, errorBody);
    }

    return NextResponse.json({ ok: true, contactId });
  } catch (error) {
    console.error("HubSpot request failed", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
