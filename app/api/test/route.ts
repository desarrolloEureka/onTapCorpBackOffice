// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
  // const authHeader = request.headers.get("authorization");
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response("Unauthorized", {
  //     status: 401,
  //   });
  // }

//   console.log("Cron Job Ran at: ", new Date());

//   return NextResponse.json({ message: "Cron Job Ran at " + new Date() });
// }

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export function GET(request: Request) {
  console.log(new Date())
  return new Response(`Hello from ${new Date()}`);
}