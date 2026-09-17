"use client";

import { useState } from "react";

type Msg = { from: "user" | "bot"; text: string };

const replies: [RegExp, string][] = [
  [/calor|kcal/i, "Para tonificar tu rango es ~1.800 kcal/día con 135g de proteína. Hoy llevas 1.240: te queda espacio para una cena con proteína y verduras. ¿Quieres una receta?"],
  [/prote/i, "Buenas fuentes: pollo, pescado, huevos, yogurt griego, lentejas. Apunta a 25-35g por comida. Un batido post-entreno ayuda a llegar al total."],
  [/rutina|entren|ejerc/i, "Hoy te toca HIIT Funcional (20 min). Si estás cansada, cambia por Estiramientos (15 min): mantener la racha vale más que la intensidad."],
  [/dolor|lesion|lesión/i, "Si hay dolor agudo, detente y no entrenes esa zona. Esta app es educativa: consulta a un profesional de salud. ¿Abro un ticket para Maleja?"],
  [/medit|estr[eé]s|ansied|paz|worship/i, "Prueba 'Gratitud y propósito' (8 min) en Paz mental, o la respiración 4-7-8: inhala 4, sostén 7, exhala 8. Tres ciclos."],
  [/peso|bajar|adelgaz/i, "Vas −1.4 kg en 8 semanas: ritmo saludable. Déficit suave (300-400 kcal), proteína alta y 3-4 entrenos/semana. No bajes de 1.400 kcal sin supervisión."],
  [/menu|men[uú]|receta|comer/i, "Tu menú gratis es Tonificación (1.800 kcal). Receta rápida: bowl de pollo, arroz integral, espinaca y limón — 580 kcal, 38g proteína."],
];
function answer(q: string) { for (const [re, a] of replies) if (re.test(q)) return a; return "Soy el asistente de Small Habits. Pregúntame por calorías, proteína, rutinas, menús, paz mental o peso. Para algo personalizado, Maleja te responde en el chat 1:1 (plan Pro)."; }

export function ChatUI({ dailyLimit }: { dailyLimit: number | null }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Hola María. Soy tu asistente. ¿Qué necesitas hoy: calorías, rutina, menú o un momento de paz?" }]);
  const [input, setInput] = useState("");
  const used = msgs.filter((m) => m.from === "user").length;
  const blocked = dailyLimit !== null && used >= dailyLimit;
  function send() { const q = input.trim(); if (!q || blocked) return; setMsgs((m) => [...m, { from: "user", text: q }]); setInput(""); setTimeout(() => setMsgs((m) => [...m, { from: "bot", text: answer(q) }]), 600); }

  return (
    <div className="card h-[520px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex fade-in ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 text-sm ${m.from === "user" ? "rounded-[12px] text-white" : "row"}`} style={m.from === "user" ? { background: "linear-gradient(135deg, var(--sage-deep), var(--sage))" } : undefined}>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="p-3" style={{ borderTop: "1px solid var(--line)" }}>
        {dailyLimit !== null && <div className="faint text-[.65rem] mb-2">{used}/{dailyLimit} mensajes hoy</div>}
        <div className="flex gap-2">
          <input id="msg-ia" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} disabled={blocked} placeholder={blocked ? "Límite diario — sube de plan para ilimitado" : "Escribe tu pregunta…"} className="input input-s" />
          <button onClick={send} disabled={blocked} className="btn btn-balance btn-sm">Enviar</button>
        </div>
      </div>
    </div>
  );
}
