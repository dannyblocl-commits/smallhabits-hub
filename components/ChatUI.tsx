"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";

type Msg = { from: "user" | "bot"; text: string };

const replies: [RegExp, string][] = [
  [/calor|kcal|calories/i, "Para tonificar tu rango es ~1.800 kcal/día con 135g de proteína. ¿Quieres una receta? / For toning, aim for ~1,800 kcal/day with 135g protein. Want a recipe?"],
  [/prote/i, "Buenas fuentes: pollo, pescado, huevos, yogurt griego, lentejas. 25-35g por comida. / Good sources: chicken, fish, eggs, Greek yogurt, lentils. 25-35g per meal."],
  [/rutina|entren|ejerc|workout|routine|treino/i, "Hoy: HIIT Funcional (20 min). Si estás cansada, Estiramientos (15 min): la racha vale más que la intensidad. / Today: Functional HIIT (20 min). Tired? Stretching (15 min): the streak matters more than intensity."],
  [/dolor|lesion|lesión|pain|injur|dor/i, "Si hay dolor agudo, detente y consulta a un profesional de salud. / If there's sharp pain, stop and consult a health professional."],
  [/medit|estr[eé]s|ansied|paz|worship|stress|anxi|peace/i, "Prueba 'Gratitud y propósito' (8 min) o la respiración 4-7-8. / Try 'Gratitude and purpose' (8 min) or 4-7-8 breathing."],
  [/peso|bajar|adelgaz|weight|lose|emagrec/i, "Ritmo saludable: déficit suave (300-400 kcal), proteína alta, 3-4 entrenos/semana. / Healthy pace: mild deficit (300-400 kcal), high protein, 3-4 workouts/week."],
  [/menu|men[uú]|receta|comer|recipe|meal|cardápio/i, "Tu menú gratis es Tonificación (1.800 kcal). Bowl de pollo, arroz integral y espinaca: 580 kcal, 38g proteína. / Your free menu is Toning (1,800 kcal)."],
];
function answer(q: string) { for (const [re, a] of replies) if (re.test(q)) return a; return "Small Habits · Pregúntame por calorías, rutinas, menús, paz mental o peso. / Ask me about calories, routines, menus, peace of mind or weight."; }

export function ChatUI({ dailyLimit, L, greeting }: { dailyLimit: number | null; L: Dict["chat"]; greeting: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: greeting }]);
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
        {dailyLimit !== null && <div className="faint text-[.65rem] mb-2">{used}/{dailyLimit} {L.msgsHoy}</div>}
        <div className="flex gap-2">
          <input id="msg-ia" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} disabled={blocked} placeholder={blocked ? L.limite : L.placeholder} className="input input-s" />
          <button onClick={send} disabled={blocked} className="btn btn-balance btn-sm">→</button>
        </div>
      </div>
    </div>
  );
}
