import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

// export async function GET(request: NextRequest) {
//   const authHeader = request.headers.get("authorization");
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return new Response("Unauthorized", {
//       status: 401,
//     });
//   }

//   console.log("Cron Job Ran at: ", new Date());

//   return NextResponse.json({ message: "Cron Job Ran at " + new Date() });
// }


// export async function GET(request: NextRequest) {
//   console.log("Cron Job Ran at: ", new Date());
//   return NextResponse.json({ message: "Cron Job Ran at " + new Date() });
// }

 
export function GET(request: Request) {
  return new Response(`Hello from ${process.env.CRON_SECRET}`);
}