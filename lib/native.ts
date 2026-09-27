import { headers } from "next/headers";

// La app de iOS/Android (Capacitor) añade "SmallHabitsApp" al user agent.
export async function isNativeApp(): Promise<boolean> {
  return ((await headers()).get("user-agent") || "").includes("SmallHabitsApp");
}
