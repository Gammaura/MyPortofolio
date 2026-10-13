import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const startTime = Date.now();
  let dbStatus = "unconfigured";
  let latencyMs = 0;

  if (supabase) {
    try {
      // Query to keep Supabase active and prevent the 7-day pause
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);

      latencyMs = Date.now() - startTime;

      if (error) {
        // Table might not exist yet, but the API request already woke the project
        dbStatus = `active_with_warning: ${error.message}`;
      } else {
        dbStatus = "active_healthy";
      }
    } catch (err) {
      latencyMs = Date.now() - startTime;
      dbStatus = `error: ${err.message}`;
    }
  }

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    dbStatus,
    latencyMs,
    message: "Supabase keep-alive ping executed successfully."
  });
}
