import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Cron Job Ran at: ", new Date());
  return NextResponse.json({ message: "Cron Job Ran at " + new Date() });
}