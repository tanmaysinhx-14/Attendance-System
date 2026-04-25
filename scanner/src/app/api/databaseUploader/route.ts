import { NextResponse } from "next/server";

const PHP_ENDPOINT = "https://accounts.careerinstitute.co.in/attendance/php-api/databaseUploader/index.php";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(PHP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const responseText = await res.text();

  try {
    const payload = JSON.parse(responseText);
    return NextResponse.json(payload, { status: res.status });
  } catch {
    return new NextResponse(responseText, { status: res.status });
  }
}
