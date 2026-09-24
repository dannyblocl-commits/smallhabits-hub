"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string;
  plan_level: string;
  trial_end: string | null;
  subscription_id: string | null;
  created_at: string;
  status: string;
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/coach/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      });
  }, []);

  const changePlan = async (userId: string, newPlan: string) => {
    setUpdating(userId);
    try {
      const res = await fetch("/api/coach/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          action: "change-plan",
          planLevel: newPlan,
        }),
      });

      if (res.ok) {
        setUsers(
          users.map((u) =>
            u.id === userId ? { ...u, plan_level: newPlan } : u
          )
        );
      }
    } finally {
      setUpdating(null);
    }
  };

  const giveAccess = async (userId: string, days: number) => {
    setUpdating(userId);
    try {
      await fetch("/api/coach/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          action: "give-access",
          daysOfAccess: days,
        }),
      });

      const newTrialEnd = new Date();
      newTrialEnd.setDate(newTrialEnd.getDate() + days);

      setUsers(
        users.map((u) =>
          u.id === userId
            ? { ...u, trial_end: newTrialEnd.toISOString() }
            : u
        )
      );
    } finally {
      setUpdating(null);
    }
  };

  const startReto = async (userId: string) => {
    setUpdating(userId);
    try {
      const res = await fetch("/api/coach/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: "start-reto" }),
      });
      if (res.ok) {
        const end = new Date();
        end.setDate(end.getDate() + 30);
        setUsers(
          users.map((u) =>
            u.id === userId
              ? { ...u, plan_level: u.plan_level === "elite" ? "elite" : "pro", trial_end: end.toISOString(), status: "Reto día 1" }
              : u
          )
        );
      }
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("es-ES");
  };

  if (loading) return <div style={{ padding: "20px" }}>Cargando...</div>;

  return (
    <div style={{ padding: "20px", background: "#0B0B0F", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link href="/coach" style={{ color: "#FF2D8A", marginBottom: "20px" }}>
          ← Volver
        </Link>

        <h1 style={{ color: "#F5F2F0", marginBottom: "10px" }}>
          👥 Usuarios ({users.length})
        </h1>
        <p style={{ color: "#A8A3AE", marginBottom: "6px" }}>
          Gestiona planes, accesos y estado de los usuarios
        </p>
        <p style={{ color: "#BA8E54", marginBottom: "20px", fontSize: "13px" }}>
          <b>Reto 30d</b> = Pro + 30 días + camino semana a semana en la app (la persona lo ve en su inicio). Cada recompra, otro <b>Reto 30d</b> o <b>+30d</b>. El acceso vence solo.
        </p>

        <div style={{ overflowX: "auto", marginTop: "20px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#F5F2F0",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid #7FC29B" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Nombre</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Plan</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Estado</th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Trial vence
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  style={{ borderBottom: "1px solid #7FC29B/30" }}
                >
                  <td style={{ padding: "10px" }}>{user.email}</td>
                  <td style={{ padding: "10px" }}>{user.name}</td>
                  <td style={{ padding: "10px" }}>
                    <span
                      style={{
                        background:
                          user.plan_level === "elite"
                            ? "#BA8E54"
                            : user.plan_level === "pro"
                              ? "#FF2D8A"
                              : "#7FC29B",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        color: "#0B0B0F",
                        fontWeight: "bold",
                      }}
                    >
                      {user.plan_level}
                    </span>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <span
                      style={{
                        color:
                          user.status === "Activa"
                            ? "#7FC29B"
                            : user.status === "En trial" || user.status.startsWith("Reto")
                              ? "#FF2D8A"
                              : "#A8A3AE",
                        fontWeight: user.status.startsWith("Reto") ? "bold" : "normal",
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: "10px" }}>
                    {formatDate(user.trial_end)}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                      <button
                        onClick={() => startReto(user.id)}
                        disabled={updating === user.id}
                        title="Asigna el Reto 30 días: Pro + 30 días de acceso + camino semana a semana"
                        style={{
                          padding: "5px 10px",
                          fontSize: "12px",
                          background: "#F5F2F0",
                          color: "#0B0B0F",
                          border: "2px solid #FF2D8A",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Reto 30d
                      </button>
                      <button
                        onClick={() => changePlan(user.id, "basico")}
                        disabled={updating === user.id}
                        style={{
                          padding: "5px 10px",
                          fontSize: "12px",
                          background: "#7FC29B",
                          color: "#0B0B0F",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Básico
                      </button>
                      <button
                        onClick={() => changePlan(user.id, "pro")}
                        disabled={updating === user.id}
                        style={{
                          padding: "5px 10px",
                          fontSize: "12px",
                          background: "#FF2D8A",
                          color: "#F5F2F0",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Pro
                      </button>
                      {[7, 30, 90].map((d) => (
                        <button
                          key={d}
                          onClick={() => giveAccess(user.id, d)}
                          disabled={updating === user.id}
                          title={`Acceso ${d} días desde hoy`}
                          style={{
                            padding: "5px 10px",
                            fontSize: "12px",
                            background: "#BA8E54",
                            color: "#0B0B0F",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          +{d}d
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
