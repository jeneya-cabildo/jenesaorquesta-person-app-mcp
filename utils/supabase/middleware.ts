// This file is deprecated and no longer used
// Database connection is now handled through Prisma with Neon
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const createClient = (request: NextRequest) => {
  throw new Error("Supabase middleware is deprecated. Use middleware.ts instead.");
};
