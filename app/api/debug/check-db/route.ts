import { NextResponse } from "next/server";
import { db, ensureSchema } from "@/lib/db";

export async function GET() {
  try {
    // Asegurar schema
    await ensureSchema();

    // Verificar que la tabla users existe
    const tableExists = await db().query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'users'
      );
    `);

    if (!tableExists.rows[0].exists) {
      return NextResponse.json({ error: "Table users no existe", status: "CRITICAL" });
    }

    // Verificar campos de la tabla
    const columns = await db().query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY column_name;
    `);

    // Contar usuarios
    const count = await db().query("SELECT COUNT(*) as count FROM users");

    return NextResponse.json({
      status: "OK",
      tableExists: true,
      totalUsers: count.rows[0].count,
      columns: columns.rows,
    });
  } catch (error: any) {
    console.error("DB Check Error:", error);
    return NextResponse.json(
      { error: error.message, status: "ERROR" },
      { status: 500 }
    );
  }
}
