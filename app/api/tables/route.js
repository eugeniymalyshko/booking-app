import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tables = await prisma.table.findMany();

    return NextResponse.json(tables);
  } catch (error) {
    console.error("Помилка завантаження столів:", error);
    return NextResponse.json(
      { error: "Невдале завантаження столів" },
      { status: 500 }
    );
  }
}
