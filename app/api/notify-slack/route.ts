import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    // Mocked: log to server console.
    console.log("[MOCK SLACK NOTIFY]", JSON.stringify(payload, null, 2));
    return NextResponse.json({ ok: true, mocked: true });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "unknown" },
      { status: 400 }
    );
  }
}
