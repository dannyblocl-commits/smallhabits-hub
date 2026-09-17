# 🏋️ Small Habits Hub — MVP Funcional

**Plataforma de fitness integral con entrenamientos personalizados, planes de nutrición y paz mental.**

## ✨ Features MVP (100% Funcional)

- ✅ Home/Landing Page profesional
- ✅ Dashboard principal para clientes
- ✅ 5 rutinas completas (Funcional, Calistenia, Pilates, Yoga, Estiramientos)
- ✅ Planes de nutrición con macros detallados
- ✅ Meditaciones, reflexiones y journaling para paz mental
- ✅ 20 clientes de ejemplo con datos realistas
- ✅ Diseño premium con paleta Small Habits (Sage, Earth, Gold)
- ✅ 100% Responsive (mobile, tablet, desktop)
- ✅ Modelo freemium (gratis + premium $9.99/mes)

## 🚀 Inicio Rápido

### 1. Instala dependencias
```bash
npm install
```

### 2. Ejecuta el servidor de desarrollo
```bash
npm run dev
```

### 3. Abre en el navegador
- Home: [http://localhost:3000](http://localhost:3000)
- Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## 📱 Páginas Funcionales

| URL | Descripción | Estado |
|-----|-------------|--------|
| `/` | Landing page + planes | ✅ Completo |
| `/dashboard` | Dashboard principal | ✅ Completo |
| `/dashboard/routines` | 5 rutinas interactivas | ✅ Completo |
| `/dashboard/nutrition` | Planes de nutrición | ✅ Completo |
| `/dashboard/mindfulness` | Meditaciones y reflexiones | ✅ Completo |

## 🎨 Paleta de Colores (Small Habits)

```
Sage Oscuro:   #6B8F71   (principal, botones hover)
Earth/Terracota: #A67C5B (botones CTA, acentos)
Gold:          #B8956A   (detalles)
Blanco Cálido: #FAFAF7   (texto)
Fondo Oscuro:  #1A1A1A   (base)
Fondo Claro:   #2D2D2D   (cards)
```

## 👥 Datos de Demo

### 20 Clientes
María García, Juan López, Sophia Rodríguez, Carlos Méndez, Ana Martínez... y 15 más.
Cada uno con: peso, altura, objetivo, estado de suscripción.

### 5 Rutinas Completas
1. Calistenia para Principiantes (30 min, 4 ejercicios)
2. Funcional HIIT (20 min, 3 ejercicios)
3. Pilates para Flexibilidad (25 min, 3 ejercicios)
4. Yoga Vinyasa Flow (40 min, 3 ejercicios)
5. Estiramientos (15 min, 4 ejercicios)

### Planes de Nutrición
- Tonificación: 1.800 kcal, 30% proteína, 50% carbs, 20% grasas
- Pérdida de peso: 2.000 kcal personalizado
- Base de alimentos común (mock)

### Paz Mental
- 5 sesiones de meditación/reflexión/journaling
- Duraciones: 5-10 minutos
- Player interactivo

## 💰 Modelo Freemium

**GRATIS:** Dashboard básico, 2 rutinas, reflexión diaria  
**PREMIUM ($9.99/mes):** Rutinas personalizadas, planes de nutrición, meditaciones, seguimiento avanzado, chat con Maleja

## 📁 Estructura

```
app/
├── page.tsx                 # Landing
└── dashboard/
    ├── page.tsx            # Dashboard
    ├── routines/page.tsx   # Entrenamientos
    ├── nutrition/page.tsx  # Nutrición
    └── mindfulness/page.tsx # Meditación
    
data/
├── clients.ts       # 20 clientes + Maleja
├── routines.ts      # 5 rutinas
└── nutrition.ts     # Planes y alimentos

lib/
└── types.ts         # TypeScript types
```

## 🔄 Próximas Integraciones (Post-MVP)

- **Supabase:** Auth + Database real
- **Stripe:** Pagos de suscripción
- **AWS S3:** Videos de ejercicios
- **Notifications:** Recordatorios y logros
- **Admin Panel:** Maleja gestica clientes

## 🎯 Deploy

**Vercel (recomendado):**
```bash
vercel deploy
```

**Netlify:**
```bash
npm run build && netlify deploy --prod
```

---

**MVP Status:** ✅ FUNCIONAL Y LISTO PARA DEMOSTRAR  
**Build Time:** 2-3 semanas  
**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS
