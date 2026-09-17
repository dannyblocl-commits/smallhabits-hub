export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "client";
  created_at: string;
}

export interface Client extends User {
  role: "client";
  trainer_id: string;
  weight?: number;
  height?: number;
  goal?: string;
  injuries?: string[];
  subscription_status: "active" | "inactive";
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  type: "funcional" | "calistenia" | "pilates" | "yoga" | "estiramientos";
  duration_minutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  exercises: Exercise[];
  client_id?: string;
  created_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  video_url?: string;
  image_url?: string;
  muscle_groups: string[];
}

export interface NutritionPlan {
  id: string;
  client_id: string;
  name: string;
  daily_calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: Meal[];
  created_at: string;
}

export interface Meal {
  id: string;
  name: string;
  time: string; // HH:MM
  foods: FoodItem[];
  calories: number;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string; // g, ml, oz, etc
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MindfulnessSession {
  id: string;
  type: "meditacion" | "reflexion" | "journal";
  title: string;
  description: string;
  duration_minutes: number;
  content: string;
  audio_url?: string;
  created_at: string;
}

export interface ClientProgress {
  id: string;
  client_id: string;
  date: string;
  weight?: number;
  mood: number; // 1-10
  energy: number; // 1-10
  sleep_hours?: number;
  workout_completed: boolean;
  notes?: string;
}

export interface StretchingRoutine {
  id: string;
  name: string;
  duration_minutes: number;
  stretches: Stretch[];
  created_at: string;
}

export interface Stretch {
  id: string;
  name: string;
  description: string;
  duration_seconds: number;
  reps?: number;
  target_muscles: string[];
  image_url?: string;
  video_url?: string;
}
