import { cookies } from "next/headers";
import {
  configured,
  hasAccess,
  requireOrigin,
  requireAccess,
  readJson,
  field,
  context,
  messages,
  prospect,
  scorecard,
  buyerPrompt,
  openai,
  response,
  reviewCall,
  LabError,
  safeEqual,
  issueSession,
  sessionCookie,
  throttle,
} from "@/lib/sales-lab/server";
export const runtime = "nodejs";
export const maxDuration = 60;
const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ action: string }> },
) {
  const { action } = await params;
  if (action !== "status") return json({ error: "Not found." }, 404);
  return json({ configured: configured(), unlocked: await hasAccess() });
}
export async function POST(
  req: Request,
  { params }: { params: Promise<{ action: string }> },
) {
  try {
    const { action } = await params;
    if (action === "unlock") {
      requireOrigin(req);
      throttle(
        `unlock:${req.headers.get("x-forwarded-for")?.split(",")[0] || "local"}`,
        5,
      );
      if (!configured())
        throw new LabError("Live AI is not configured yet.", 503);
      const body = await readJson(req, 1000);
      const code = field(body.code, "access code", 200);
      if (!safeEqual(code, process.env.SALES_LAB_ACCESS_CODE!))
        throw new LabError("That access code is not valid.", 401);
      (await cookies()).set(sessionCookie, issueSession(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/api/sales-lab",
      });
      return json({ ok: true });
    }
    if (action === "lock") {
      requireOrigin(req);
      (await cookies()).set(sessionCookie, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/api/sales-lab",
      });
      return json({ ok: true });
    }
    if (!["chat", "review", "voice", "transcribe"].includes(action))
      return json({ error: "Not found." }, 404);
    await requireAccess(req);
    if (action === "transcribe") {
      if (Number(req.headers.get("content-length") || 0) > 4100000)
        throw new LabError("Audio must be smaller than 4 MB.", 413);
      const form = await req.formData();
      const file = form.get("file");
      if (
        !(file instanceof File) ||
        file.size > 4000000 ||
        file.size < 1 ||
        !["mp3", "wav", "m4a", "webm", "mp4", "mpeg", "mpga", "ogg"].includes(
          file.name.split(".").at(-1)?.toLowerCase() || "",
        )
      )
        throw new LabError("Upload an audio file under 4 MB.");
      const body = new FormData();
      body.set("file", file);
      body.set(
        "model",
        process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-4o-mini-transcribe",
      );
      body.set("response_format", "json");
      const result = await (await openai("audio/transcriptions", body)).json();
      return json({ text: result.text });
    }
    const body = await readJson(req);
    const knowledge = context(body.context);
    if (action === "chat") {
      const turns = messages(body.messages);
      if (turns.length > 60)
        throw new LabError(
          "This practice has reached its 60-turn limit. End it for a review.",
        );
      const p = prospect(body.prospect);
      return json({ reply: await response(buyerPrompt(p, knowledge), turns) });
    }
    if (action === "review")
      return json({
        review: await reviewCall(
          messages(body.messages),
          scorecard(body.scorecard),
          knowledge,
        ),
      });
    const p = prospect(body.prospect);
    const sdp = field(body.sdp, "voice offer", 30000);
    if (!sdp.startsWith("v=0")) throw new LabError("Invalid voice offer.");
    const form = new FormData();
    form.set("sdp", sdp);
    form.set(
      "session",
      JSON.stringify({
        type: "realtime",
        model: process.env.OPENAI_REALTIME_MODEL || "gpt-realtime-2.1",
        instructions: buyerPrompt(p, knowledge),
        max_output_tokens: 800,
        audio: {
          input: {
            transcription: { model: "gpt-4o-mini-transcribe" },
            turn_detection: {
              type: "server_vad",
              create_response: true,
              interrupt_response: true,
            },
          },
          output: { voice: "marin" },
        },
      }),
    );
    const result = await openai("realtime/calls", form);
    return new Response(await result.text(), {
      headers: {
        "Content-Type": "application/sdp",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof LabError)
      return json({ error: error.message }, error.status);
    console.error(
      "Sales Lab request failed:",
      error instanceof Error ? error.name : "Unknown",
    );
    return json(
      { error: "The request could not be completed. Please try again." },
      500,
    );
  }
}
