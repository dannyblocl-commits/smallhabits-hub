"use client";

import { useState } from "react";

type Msg = { from: "user" | "bot"; text: string };

const replies: [RegExp, string][] = [
  [/calor|kcal/i, "Para tu objetivo (tonificar) tu rango es ~1.800 kcal/día con 135g de proteína. Hoy llevas 1.240 kcal: te queda espacio para una cena con proteína y verduras. ¿Quieres una receta?"],
  [/prote/i, "Buenas fuentes: pollo, pescado, huevos, yogurt griego, lentejas. Apunta a 25-35g por comida. Un batido post-entreno ayuda a llegar al total."],
  [/rutina|entren|ejerc/i, "Hoy te toca Calistenia para Principiantes (30 min). Si estás cansada, cambia por Estiramientos (15 min): mantener la racha vale más que la intensidad."],
  [/dolor|lesion|lesión/i, "Si hay dolor agudo, detente y no entrenes esa zona. Esta app es educativa: consulta a un profesional de salud. ¿Quieres que abra un ticket para Maleja?"],
  [/medit|estr[eé]s|ansied|paz/i, "Prueba la sesión 'Gratitud y propósito' (8 min) en Paz Mental. Respira 4 segundos, sostén 4, exhala 6. Repite 5 veces."],
  [/peso|bajar|adelgaz/i, "Vas −1.4 kg en 8 semanas: ritmo saludable. Mantén déficit suave (300-400 kcal), proteína alta y 3-4 entrenos/semana. No bajes de 1.400 kcal sin supervisión."],
  [/menu|men[uú]|receta|comer/i, "Tu menú gratis es 'Tonificación' (1.800 kcal). Receta rápida: bowl de pollo, arroz integral, espinaca y aderezo de limón — 580 kcal, 38g proteína."],
];

function answer(q: string) {
  for (const [re, a] of replies) if (re.test(q)) return a;
  return "Soy el asistente de Small Habits. Puedo ayudarte con calorías, proteína, rutinas, menús, paz mental o peso. Para algo personalizado, Maleja te responde en el chat 1:1 (plan Pro).";
}

export function ChatUI({ dailyLimit }: { dailyLimit: number | null }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "¡Hola María! 🌿 Soy tu asistente IA. ¿Qué necesitas hoy: calorías, rutina, menú o un momento de paz?" }]);
  const [input, setInput] = useState("");
  const used = msgs.filter((m) => m.from === "user").length;
  const blocked = dailyLimit !== null && used >= dailyLimit;

  function send() {
    const q = input.trim();
    if (!q || blocked) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { from: "bot", text: answer(q) }]), 600);
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E0D5C8] flex flex-col h-[520px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.from === "user" ? "bg-[#6B8F71] text-white" : "bg-[#EDE6DC] text-[#2C2C2C]"}`}>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#E0D5C8] p-3">
        {dailyLimit !== null && <div className="text-[11px] text-[#6B6560] mb-2">Plan gratis: {used}/{dailyLimit} mensajes hoy</div>}
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} disabled={blocked}
            placeholder={blocked ? "Límite diario alcanzado — sube de plan para ilimitado" : "Escribe tu pregunta..."}
            className="flex-1 border border-[#E0D5C8] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#6B8F71] disabled:bg-[#FAFAF7]" />
          <button onClick={send} disabled={blocked} className="bg-[#A67C5B] hover:bg-[#C9A882] disabled:opacity-50 text-white px-5 py-2 rounded-full text-sm font-semibold transition">Enviar</button>
        </div>
      </div>
    </div>
  );
}
