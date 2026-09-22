# Sales Lab

Sales Lab is the independent sales-training section at `/sales-lab`.

## Available now

- Six fictional buyer scenarios; custom prospect creation.
- Guided text practice, explicitly labeled as scripted rather than AI.
- Transcript import, deterministic language-coverage checklists, and sample reviews.
- Weighted custom scorecards and consultative, BANT, and MEDDIC templates.
- Session history, notes, JSON export, training goals, and progress by scorecard.
- Local browser persistence. Recordings are temporary and must be downloaded.
- Homepage portfolio entry, desktop/mobile navigation link, and canonical metadata.

## AI implementation, awaiting credentials and live testing

Server-only OpenAI calls support text roleplay, WebRTC voice roleplay, audio
transcription, and structured evidence-based reviews. Live features stay off until
all three required environment variables are present. There is no fallback that
pretends a guided checklist is AI output.

Configure the existing Vercel project `garrett-lisowski` with:

- `OPENAI_API_KEY`: a funded OpenAI project key.
- `SALES_LAB_ACCESS_CODE`: a private invitation code of at least 16 characters.
- `SALES_LAB_SESSION_SECRET`: a random signing secret of at least 32 characters.

Optional model overrides are documented in `.env.example`. Redeploy after changing
production environment variables. In Sales Lab → Connections, enter the private
access code. Do not put service keys in the browser or commit `.env.local`.

The code is verified locally with mocked provider responses, but paid AI behavior
and microphone/audio behavior require a real credential and human voice test.
Set an OpenAI project spend limit before inviting users. The application uses a
signed, HttpOnly, one-hour cookie, same-origin writes, bounded request bodies,
output limits, and a secondary in-memory per-instance throttle. The throttle is
not a global distributed quota; use a durable rate limiter and individual user
accounts before opening paid AI usage to an unrestricted public audience.

Voice recordings combine local and remote audio in the browser. Text and audio
used for live sessions are sent to OpenAI. Transcripts and reviews stay in the
visitor's browser. Model-generated reviews are not validated measures of sales
ability, and guided scores should not be compared to AI scores as if equivalent.

## Remaining Kendo parity

This is not a complete recreation of Kendo. Shared authenticated team workspaces,
manager/rep permissions, team assignment and analytics, cloud recording storage,
CRM/calendar/meeting-recorder OAuth connections, automatic call ingestion,
webhooks, and billing are not implemented. They require an agreed account/data
architecture and service connections. The interface does not advertise them as
working. The public product uses its own branding and assets.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`.
The unit tests exercise weighted scoring, speaker attribution, request validation,
session forgery/expiry, cross-origin protection, and malformed provider output.
Browser checks cover roleplay, completed reviews, saved reflections, training,
imports, scorecard validation, persistence, and the responsive surface.

## References

- https://docs.kendo.ai/docs/roleplay-training
- https://docs.kendo.ai/docs/custom-scorecards
- https://developers.openai.com/api/docs/guides/voice-webrtc
- https://developers.openai.com/api/docs/guides/structured-outputs
- https://developers.openai.com/api/docs/guides/speech-to-text
