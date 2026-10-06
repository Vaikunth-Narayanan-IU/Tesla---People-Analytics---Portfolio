"use server";

import { prisma } from "@/lib/prisma";

export async function executeSql(query: string) {
  try {
    // Only allow SELECT queries for safety
    if (!query.trim().toUpperCase().startsWith("SELECT")) {
      return { error: "Only SELECT queries are permitted in the SQL Lab." };
    }
    
    // SQLite uses $queryRawUnsafe
    const result = await prisma.$queryRawUnsafe(query);
    
    // Handle bigints from raw queries if any
    const formattedResult = JSON.parse(JSON.stringify(result, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    ));

    return { data: formattedResult };
  } catch (error: any) {
    return { error: error.message || "An error occurred executing the query." };
  }
}
