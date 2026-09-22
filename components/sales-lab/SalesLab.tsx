"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChartLineUp,
  ChatCircleText,
  Check,
  CheckCircle,
  ClipboardText,
  DownloadSimple,
  FileText,
  GearSix,
  Headphones,
  Lightbulb,
  Microphone,
  MicrophoneSlash,
  Phone,
  PhoneDisconnect,
  Plus,
  Robot,
  SlidersHorizontal,
  Sparkle,
  Target,
  Trash,
  TrendUp,
  UploadSimple,
  Waveform,
  X,
} from "@phosphor-icons/react";
import {
  initialWorkspace,
  parseTranscript,
  sampleTranscript,
  validateScorecard,
  type Assignment,
  type Message,
  type Prospect,
  type Review,
  type Scorecard,
  type Session,
  type Workspace,
} from "@/lib/sales-lab/model";
import { guidedReply, guidedReview } from "@/lib/sales-lab/guided";
import { updateTranscript } from "@/lib/sales-lab/realtime";

type Section =
  | "practice"
  | "reviews"
  | "progress"
  | "training"
  | "scorecards"
  | "context"
  | "connections";
type ActiveCall = {
  prospect: Prospect;
  messages: Message[];
  started: number;
  mode: "guided" | "text" | "voice";
  card: Scorecard;
  context: string;
};
const navigation = [
  { id: "practice", label: "Roleplay", icon: Headphones },
  { id: "reviews", label: "Call reviews", icon: ChatCircleText },
  { id: "progress", label: "My progress", icon: ChartLineUp },
  { id: "training", label: "Training plan", icon: Target },
  { id: "scorecards", label: "Scorecards", icon: ClipboardText },
  { id: "context", label: "Knowledge", icon: Lightbulb },
  { id: "connections", label: "Connections", icon: GearSix },
] as const;
const labels: Record<Section, string> = {
  practice: "Practice studio",
  reviews: "Call reviews",
  progress: "Performance",
  training: "Training plan",
  scorecards: "Custom scorecards",
  context: "Knowledge & context",
  connections: "Connections",
};
const storageKey = "gl-sales-lab-v1";
const errorText = (e: unknown) =>
  e instanceof Error ? e.message : "Something went wrong. Please try again.";
const uid = () => crypto.randomUUID();
function download(name: string, content: string, type = "application/json") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function api(action: string, data: unknown) {
  const r = await fetch(`/api/sales-lab/${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await r.json();
  if (!r.ok)
    throw new Error(result.error || "The request could not be completed.");
  return result;
}
function initials(name: string) {
  return name
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("");
}
function time(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function Modal({
  title,
  children,
  close,
}: {
  title: string;
  children: ReactNode;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog className="sl-dialog" ref={ref} onCancel={close} aria-label={title}>
      <div className="sl-modal-heading">
        <h2>{title}</h2>
        <button
          className="sl-icon-button"
          aria-label="Close dialog"
          onClick={close}
        >
          <X size={21} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
function Empty({
  icon: Icon = Headphones,
  title,
  body,
  children,
}: {
  icon?: typeof Headphones;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div className="sl-empty">
      <Icon size={34} weight="light" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{body}</p>
      {children}
    </div>
  );
}
function ProspectForm({
  save,
  close,
}: {
  save: (p: Prospect) => void;
  close: () => void;
}) {
  return (
    <Modal title="Create a practice prospect" close={close}>
      <form
        className="sl-form"
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const value = (key: string) => String(f.get(key) || "").trim();
          save({
            id: uid(),
            name: value("name"),
            role: value("role"),
            company: value("company"),
            industry: value("industry"),
            type: value("type") as Prospect["type"],
            difficulty: value("difficulty") as Prospect["difficulty"],
            color: "blue",
            brief: value("brief"),
            goal: value("goal"),
            opening: value("opening"),
            objections: value("objections"),
            product: value("product"),
          });
        }}
      >
        <div className="sl-form-grid">
          <label>
            Name
            <input
              name="name"
              required
              maxLength={80}
              placeholder="Alex Morgan"
            />
          </label>
          <label>
            Role
            <input
              name="role"
              required
              maxLength={100}
              placeholder="Director of Operations"
            />
          </label>
          <label>
            Company
            <input
              name="company"
              required
              maxLength={100}
              placeholder="Fictional company"
            />
          </label>
          <label>
            Industry
            <input
              name="industry"
              required
              maxLength={80}
              placeholder="Software"
            />
          </label>
          <label>
            Call type
            <select name="type">
              <option>Discovery</option>
              <option>Cold call</option>
              <option>Objections</option>
              <option>Closing</option>
            </select>
          </label>
          <label>
            Personality
            <select name="difficulty">
              <option>Balanced</option>
              <option>Warm</option>
              <option>Skeptical</option>
            </select>
          </label>
        </div>
        <label>
          What are you selling?
          <textarea
            name="product"
            required
            maxLength={1200}
            rows={2}
            placeholder="Describe the product, value, and price if relevant."
          />
        </label>
        <label>
          Buyer’s situation
          <textarea name="brief" required maxLength={1200} rows={2} />
        </label>
        <label>
          Your training goal
          <input name="goal" required maxLength={500} />
        </label>
        <label>
          Likely objections
          <input name="objections" required maxLength={500} />
        </label>
        <label>
          Buyer’s opening line
          <input name="opening" required maxLength={500} />
        </label>
        <button className="sl-button" type="submit">
          Create prospect <ArrowRight size={17} />
        </button>
      </form>
    </Modal>
  );
}

export function SalesLab({ initialDemo = "practice" }: { initialDemo?: "practice" | "review" }) {
  const [workspace, setWorkspace] = useState<Workspace>(initialWorkspace);
  const [ready, setReady] = useState(false);
  const [section, setSection] = useState<Section>(initialDemo === "review" ? "reviews" : "practice");
  const [filter, setFilter] = useState("All scenarios");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"prospect" | "upload" | "unlock" | null>(
    null,
  );
  const [selected, setSelected] = useState<Prospect | null>(null);
  const [active, setActive] = useState<ActiveCall | null>(null);
  const [result, setResult] = useState<Session | null>(() => initialDemo === "review" ? {
    id: "sample", title: "Discovery: finding the cost of missed handoffs", prospect: "Maya Chen",
    type: "Discovery", date: "2026-09-22T00:00:00.000Z", seconds: 0,
    messages: parseTranscript(sampleTranscript),
    review: guidedReview(parseTranscript(sampleTranscript), initialWorkspace().scorecards[0]),
    scorecard: initialWorkspace().scorecards[0].name, notes: "", mode: "guided",
  } : null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState({ configured: false, unlocked: false });
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [scoreDraft, setScoreDraft] = useState<Scorecard | null>(null);
  const [contextDraft, setContextDraft] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [input, setInput] = useState("");
  const [muted, setMuted] = useState(false);
  const [voiceState, setVoiceState] = useState("Connecting…");
  const voiceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const peer = useRef<RTCPeerConnection | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState<string | null>(null);
  const conversationEnd = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const card =
    workspace.scorecards.find((c) => c.id === workspace.activeScorecard) ||
    workspace.scorecards[0];
  const live = status.configured && status.unlocked;
  const activeStarted = active?.started;
  const isActive = !!active;

  useEffect(() => {
    let alive = true;
    Promise.resolve().then(() => {
      if (!alive) return;
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (
            parsed.version === 1 &&
            Array.isArray(parsed.prospects) &&
            Array.isArray(parsed.sessions) &&
            parsed.scorecards?.length &&
            Array.isArray(parsed.assignments)
          ) {
            setWorkspace(parsed);
            setContextDraft(parsed.context || "");
          }
        }
      } catch {
        setNotice(
          "Your saved workspace could not be read. A new workspace has been opened.",
        );
      }
      setReady(true);
    });
    fetch("/api/sales-lab/status")
      .then((r) => r.json())
      .then((s) => {
        if (alive) setStatus(s);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(workspace));
    } catch {
      queueMicrotask(() =>
        setNotice(
          "Your browser could not save this workspace. Export your sessions before leaving.",
        ),
      );
    }
  }, [workspace, ready]);
  useEffect(() => {
    if (!activeStarted) return;
    const timer = setInterval(
      () => setElapsed(Math.floor((Date.now() - activeStarted) / 1000)),
      1000,
    );
    return () => clearInterval(timer);
  }, [activeStarted]);
  useEffect(() => {
    conversationEnd.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [active?.messages.length, busy]);
  useEffect(
    () => () => {
      if (voiceTimeout.current) clearTimeout(voiceTimeout.current);
      if (recorder.current?.state === "recording") recorder.current.stop();
      peer.current?.close();
      stream.current?.getTracks().forEach((t) => t.stop());
      audio.current?.pause();
      audioContext.current?.close().catch(() => {});
    },
    [],
  );
  useEffect(
    () => () => {
      if (recording) URL.revokeObjectURL(recording);
    },
    [recording],
  );
  useEffect(() => {
    if (!isActive) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isActive]);

  function go(next: Section) {
    setSection(next);
    setResult(null);
    setError("");
    setNotice("");
    setSearch("");
  }
  function stopVoice() {
    if (voiceTimeout.current) clearTimeout(voiceTimeout.current);
    if (recorder.current?.state === "recording") recorder.current.stop();
    peer.current?.close();
    peer.current = null;
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    audio.current?.pause();
    audio.current = null;
    audioContext.current?.close().catch(() => {});
    audioContext.current = null;
  }
  async function start(p: Prospect, mode: ActiveCall["mode"]) {
    setError("");
    setNotice("");
    setSelected(null);
    setResult(null);
    setElapsed(0);
    setInput("");
    setRecording(null);
    setMuted(false);
    const call: ActiveCall = {
      prospect: p,
      messages:
        mode === "voice" ? [] : [{ role: "assistant", content: p.opening }],
      started: Date.now(),
      mode,
      card: structuredClone(card),
      context: workspace.context,
    };
    setActive(call);
    if (mode !== "voice") return;
    setVoiceState("Connecting…");
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = media;
      const pc = new RTCPeerConnection();
      peer.current = pc;
      const output = new Audio();
      output.autoplay = true;
      audio.current = output;
      const ctx = new AudioContext();
      audioContext.current = ctx;
      const mixed = ctx.createMediaStreamDestination();
      ctx.createMediaStreamSource(media).connect(mixed);
      const rec = new MediaRecorder(mixed.stream);
      recorder.current = rec;
      chunks.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size) chunks.current.push(e.data);
      };
      rec.onstop = () => {
        if (chunks.current.length)
          setRecording(
            URL.createObjectURL(
              new Blob(chunks.current, { type: rec.mimeType }),
            ),
          );
      };
      rec.start();
      pc.ontrack = (e) => {
        output.srcObject = e.streams[0];
        output
          .play()
          .catch(() =>
            setNotice("Use your browser’s audio controls to allow playback."),
          );
        ctx.createMediaStreamSource(e.streams[0]).connect(mixed);
      };
      media.getTracks().forEach((t) => pc.addTrack(t, media));
      const channel = pc.createDataChannel("oai-events");
      channel.onopen = () => {
        voiceTimeout.current = setTimeout(() => {
          stopVoice();
          setVoiceState("Practice limit reached");
          setNotice(
            "This voice practice reached its 10-minute limit. End the session to review your transcript.",
          );
        }, 600000);
        setVoiceState("Listening");
        channel.send(
          JSON.stringify({
            type: "response.create",
            response: {
              instructions:
                "Begin the roleplay with the prospect’s opening line. Keep it brief.",
            },
          }),
        );
      };
      channel.onmessage = (e) => {
        let event;
        try {
          event = JSON.parse(e.data);
        } catch {
          return;
        }
        if (event.type === "input_audio_buffer.speech_started")
          setVoiceState("Listening");
        if (event.type === "response.created")
          setVoiceState("Prospect speaking");
        if (event.type === "response.done") setVoiceState("Listening");
        setActive((a) =>
          a ? { ...a, messages: updateTranscript(a.messages, event) } : a,
        );
        if (event.type === "error")
          setError(
            "The voice session encountered an error. End the call and try again.",
          );
      };
      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "failed") {
          setVoiceState("Disconnected");
          setError(
            "The voice connection dropped. End the session to save the available transcript.",
          );
          stopVoice();
        }
      };
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      const response = await fetch("/api/sales-lab/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sdp: offer.sdp,
          prospect: p,
          context: workspace.context,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Voice is unavailable.");
      }
      await pc.setRemoteDescription({
        type: "answer",
        sdp: await response.text(),
      });
    } catch (e) {
      stopVoice();
      setActive(null);
      setError(errorText(e));
    }
  }
  async function send(e: FormEvent) {
    e.preventDefault();
    if (
      !active ||
      busyRef.current ||
      !input.trim() ||
      active.messages.length >= 60
    )
      return;
    busyRef.current = true;
    const messages = [
      ...active.messages,
      { role: "user" as const, content: input.trim() },
    ];
    setActive({ ...active, messages });
    setInput("");
    setBusy(true);
    setError("");
    try {
      const reply =
        active.mode === "guided"
          ? guidedReply(messages, active.prospect)
          : (
              await api("chat", {
                messages,
                prospect: active.prospect,
                context: active.context,
              })
            ).reply;
      setActive((a) =>
        a
          ? {
              ...a,
              messages: [...messages, { role: "assistant", content: reply }],
            }
          : a,
      );
    } catch (e) {
      setError(errorText(e));
      setInput(messages.at(-1)!.content);
      setActive((a) => (a ? { ...a, messages: messages.slice(0, -1) } : a));
    } finally {
      setBusy(false);
      busyRef.current = false;
    }
  }
  function saveSession(session: Session) {
    setWorkspace((w) => ({
      ...w,
      sessions: [session, ...w.sessions].slice(0, 100),
    }));
    setResult(session);
    setActive(null);
    setSection("reviews");
  }
  async function finish() {
    if (!active || busyRef.current) return;
    if (!active.messages.some((m) => m.role === "user" && m.content.trim())) {
      stopVoice();
      setActive(null);
      setNotice(
        "Session closed. Add at least one response to receive a review.",
      );
      return;
    }
    busyRef.current = true;
    stopVoice();
    setBusy(true);
    setError("");
    try {
      const review: Review =
        active.mode === "guided"
          ? guidedReview(active.messages, active.card)
          : (
              await api("review", {
                messages: active.messages.filter((m) => m.content),
                scorecard: active.card,
                context: active.context,
              })
            ).review;
      saveSession({
        id: uid(),
        title: `${active.prospect.type} with ${active.prospect.name}`,
        prospect: active.prospect.name,
        type: active.prospect.type,
        date: new Date().toISOString(),
        seconds: elapsed,
        messages: active.messages.filter((m) => m.content),
        review,
        scorecard: active.card.name,
        notes: "",
        mode: active.mode,
      });
    } catch (e) {
      setError(
        `${errorText(e)} Your transcript is still here. Retry the review or export the transcript.`,
      );
    } finally {
      setBusy(false);
      busyRef.current = false;
    }
  }
  async function reviewUpload(e: FormEvent) {
    e.preventDefault();
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError("");
    try {
      const messages = parseTranscript(reviewText);
      if (messages.length < 2)
        throw new Error(
          "Add at least two speaker turns, labeled Rep: and Buyer:.",
        );
      const review = live
        ? (
            await api("review", {
              messages,
              scorecard: card,
              context: workspace.context,
            })
          ).review
        : guidedReview(messages, card);
      saveSession({
        id: uid(),
        title: reviewTitle.trim() || "Imported call review",
        prospect: "Imported conversation",
        type: "Call review",
        date: new Date().toISOString(),
        seconds: 0,
        messages,
        review,
        scorecard: card.name,
        notes: "",
        mode: "upload",
      });
      setModal(null);
      setReviewText("");
      setReviewTitle("");
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
      busyRef.current = false;
    }
  }
  async function uploadFile(file?: File) {
    if (!file) return;
    setError("");
    try {
      if (file.size > 4_000_000)
        throw new Error(
          "Choose a file smaller than 4 MB. For longer calls, paste a transcript.",
        );
      if (/\.(txt|vtt|srt)$/i.test(file.name)) {
        const text = await file.text();
        if (text.length > 30000)
          throw new Error("Transcripts must be under 30,000 characters.");
        setReviewText(text);
        return;
      }
      if (!live)
        throw new Error(
          "Audio transcription needs an active AI connection. You can paste a transcript now.",
        );
      setBusy(true);
      const form = new FormData();
      form.append("file", file);
      const r = await fetch("/api/sales-lab/transcribe", {
        method: "POST",
        body: form,
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setReviewText(data.text);
      setNotice(
        "Transcribed. Add Rep: and Buyer: speaker labels before scoring.",
      );
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  function showSample() {
    const messages = parseTranscript(sampleTranscript);
    setResult({
      id: "sample",
      title: "Discovery: finding the cost of missed handoffs",
      prospect: "Maya Chen",
      type: "Discovery",
      date: new Date().toISOString(),
      seconds: 0,
      messages,
      review: guidedReview(messages, card),
      scorecard: card.name,
      notes: "",
      mode: "guided",
    });
    setSection("reviews");
  }
  const visibleProspects = workspace.prospects.filter(
    (p) =>
      (filter === "All scenarios" || p.type === filter) &&
      `${p.name} ${p.role} ${p.company}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const filteredSessions = workspace.sessions.filter((s) =>
    `${s.title} ${s.prospect}`.toLowerCase().includes(search.toLowerCase()),
  );
  const metrics = workspace.sessions.filter((s) => s.scorecard === card.name);
  const avg = metrics.length
    ? Math.round(
        metrics.reduce((a, s) => a + s.review.overall, 0) / metrics.length,
      )
    : null;

  return (
    <div className="sl-app">
      <a className="skip-link" href="#sales-main">
        Skip to workspace
      </a>
      <aside className="sl-sidebar">
        <Link className="sl-brand" href="/sales-lab">
          <span className="sl-brand-mark">
            <Waveform size={23} weight="bold" />
          </span>
          <span>
            Sales Lab<small>BY GARRETT LISOWSKI</small>
          </span>
        </Link>
        <div className="sl-workspace-name">
          <span className="sl-avatar small blue">GL</span>
          <div>
            Practice workspace<small>Saved in this browser</small>
          </div>
        </div>
        <nav aria-label="Sales Lab">
          <span className="sl-nav-label">WORKSPACE</span>
          {navigation.map(({ id, label, icon: Icon }, i) => (
            <div key={id}>
              {i === 4 && <span className="sl-nav-label">YOUR PLAYBOOK</span>}
              <button
                onClick={() => go(id)}
                disabled={!!active}
                aria-current={section === id ? "page" : undefined}
                className={section === id ? "active" : ""}
              >
                <Icon size={19} />
                {label}
                {id === "reviews" && workspace.sessions.length > 0 && (
                  <span className="sl-count">{workspace.sessions.length}</span>
                )}
              </button>
            </div>
          ))}
        </nav>
        <div className="sl-sidebar-bottom">
          <div className="sl-project-note">
            <Sparkle size={20} />
            <strong>Built to get better.</strong>
            <p>
              A hands-on sales training project. Try a conversation and explore
              the feedback.
            </p>
          </div>
          <Link href="/">
            <ArrowLeft size={17} />
            Back to portfolio
          </Link>
        </div>
      </aside>
      <div className="sl-main-wrap">
        <header className="sl-topbar">
          <div>
            <span className="sl-breadcrumb">Sales Lab</span>
            <span className="sl-slash">/</span>
            <strong>{labels[section]}</strong>
          </div>
          <button
            className={`sl-connection ${live ? "connected" : ""}`}
            onClick={() => go("connections")}
            disabled={!!active}
          >
            <span />
            {live ? "AI connected" : "Guided demo"}
          </button>
        </header>
        <main id="sales-main" className="sl-main">
          {notice && (
            <div className="sl-notice" role="status">
              <CheckCircle size={18} />
              <span>{notice}</span>
              <button
                className="sl-icon-button"
                aria-label="Dismiss notification"
                onClick={() => setNotice("")}
              >
                <X size={16} />
              </button>
            </div>
          )}
          {error && (
            <div className="sl-error" role="alert">
              {error}
            </div>
          )}
          {!ready ? (
            <Empty
              title="Opening your workspace"
              body="Your practice sessions will appear here."
            />
          ) : active ? (
            <>
              <div className="sl-page-heading">
                <div>
                  <p className="sl-eyebrow">
                    {active.mode === "guided"
                      ? "GUIDED PRACTICE"
                      : active.mode === "voice"
                        ? "LIVE VOICE ROLEPLAY"
                        : "AI TEXT ROLEPLAY"}
                  </p>
                  <h1>
                    A conversation with {active.prospect.name.split(" ")[0]}.
                  </h1>
                  <p>
                    {active.prospect.role} · {active.prospect.company}
                  </p>
                </div>
                <span className="sl-timer">{time(elapsed)}</span>
              </div>
              <div className="sl-call-layout">
                <section className="sl-conversation">
                  <div className="sl-conversation-top">
                    <span className={`sl-avatar ${active.prospect.color}`}>
                      {initials(active.prospect.name)}
                    </span>
                    <div>
                      <strong>{active.prospect.name}</strong>
                      <small>
                        {active.mode === "voice"
                          ? voiceState
                          : active.mode === "guided"
                            ? "Scripted buyer · text practice"
                            : "AI buyer · text practice"}
                      </small>
                    </div>
                    {active.mode === "voice" && <Waveform size={28} />}
                  </div>
                  <div
                    className="sl-messages"
                    aria-live="polite"
                    aria-label="Conversation transcript"
                  >
                    {active.messages.length === 0 && (
                      <p className="sl-muted">
                        Your transcript will appear as you speak.
                      </p>
                    )}
                    {active.messages
                      .filter((m) => m.content)
                      .map((m, i) => (
                        <div key={m.id || i} className={`sl-message ${m.role}`}>
                          <small>
                            {m.role === "user" ? "You" : active.prospect.name}
                          </small>
                          <p>{m.content}</p>
                        </div>
                      ))}
                    {busy && (
                      <p className="sl-muted">
                        {active.mode === "guided"
                          ? "Preparing review…"
                          : "Working…"}
                      </p>
                    )}
                    <div ref={conversationEnd} />
                  </div>
                  {active.mode !== "voice" ? (
                    <form className="sl-composer" onSubmit={send}>
                      <label className="sl-sr-only" htmlFor="reply">
                        Your response
                      </label>
                      <textarea
                        id="reply"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question. Listen. Follow the thread."
                        maxLength={2000}
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            e.currentTarget.form?.requestSubmit();
                          }
                        }}
                      />
                      <button
                        className="sl-button"
                        disabled={
                          busy || !input.trim() || active.messages.length >= 60
                        }
                        aria-label="Send response"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </form>
                  ) : (
                    <div className="sl-voice-controls">
                      <button
                        className="sl-secondary"
                        onClick={() => {
                          stream.current
                            ?.getAudioTracks()
                            .forEach((t) => (t.enabled = muted));
                          setMuted(!muted);
                        }}
                      >
                        {muted ? <MicrophoneSlash /> : <Microphone />}
                        {muted ? "Unmute" : "Mute"}
                      </button>
                      <span>
                        Audio is processed by OpenAI. Recording stays in this
                        tab.
                      </span>
                    </div>
                  )}
                </section>
                <aside className="sl-call-brief">
                  <span className="sl-tag">{active.prospect.type}</span>
                  <h3>Your objective</h3>
                  <p>{active.prospect.goal}</p>
                  <h3>What you’re selling</h3>
                  <p>{active.prospect.product}</p>
                  <h3>Scorecard</h3>
                  <p>{active.card.name}</p>
                  <ul>
                    {active.card.criteria.map((c) => (
                      <li key={c.id}>
                        <span>{c.name}</span>
                        <small>{c.weight}%</small>
                      </li>
                    ))}
                  </ul>
                  {active.mode === "guided" && (
                    <p className="sl-caption">
                      Guided mode uses scripted responses and a language
                      checklist. It is not live AI coaching.
                    </p>
                  )}
                  <button
                    className="sl-button sl-end"
                    onClick={finish}
                    disabled={busy}
                  >
                    <PhoneDisconnect size={19} />
                    {busy ? "Preparing review…" : "End & review"}
                  </button>
                  <button
                    className="sl-text-button"
                    onClick={() =>
                      download(
                        "sales-lab-transcript.txt",
                        active.messages
                          .map(
                            (m) =>
                              `${m.role === "user" ? "Rep" : "Buyer"}: ${m.content}`,
                          )
                          .join("\n"),
                        "text/plain",
                      )
                    }
                  >
                    Export transcript
                  </button>
                </aside>
              </div>
            </>
          ) : result ? (
            <ReviewPanel
              session={result}
              recording={recording}
              back={() => setResult(null)}
              retry={() => {
                const p =
                  workspace.prospects.find((p) => p.name === result.prospect) ||
                  workspace.prospects[0];
                setResult(null);
                setSelected(p);
              }}
              addTraining={() => {
                const a: Assignment = {
                  id: uid(),
                  title: result.review.nextPractice,
                  prospectId:
                    workspace.prospects.find((p) => p.name === result.prospect)
                      ?.id || workspace.prospects[0].id,
                  target: 80,
                  completed: false,
                  due: "",
                };
                setWorkspace((w) => ({
                  ...w,
                  assignments: [...w.assignments, a],
                }));
                go("training");
                setNotice("Practice added to your training plan.");
              }}
              notes={(value) => {
                setWorkspace((w) => ({
                  ...w,
                  sessions: w.sessions.map((s) =>
                    s.id === result.id ? { ...s, notes: value } : s,
                  ),
                }));
                setResult((r) => (r ? { ...r, notes: value } : r));
              }}
            />
          ) : (
            <>
              {section === "practice" && (
                <>
                  <div className="sl-page-heading">
                    <div>
                      <p className="sl-eyebrow">
                        DELIBERATE PRACTICE. BETTER CONVERSATIONS.
                      </p>
                      <h1>Make your next call better.</h1>
                      <p>
                        Meet your buyer. Find the problem. Earn the next step.
                      </p>
                    </div>
                    <button
                      className="sl-button"
                      onClick={() => setModal("prospect")}
                    >
                      <Plus size={18} />
                      Create prospect
                    </button>
                  </div>
                  <div className="sl-start-grid">
                    <section className="sl-feature">
                      <div>
                        <span className="sl-tag">TODAY’S PRACTICE</span>
                        <h2>
                          Go beyond the
                          <br />
                          first answer.
                        </h2>
                        <p>
                          Maya has a process problem. Your job is to discover
                          what it costs her business.
                        </p>
                        <button
                          className="sl-button"
                          onClick={() => setSelected(workspace.prospects[0])}
                        >
                          Practice discovery <ArrowRight size={18} />
                        </button>
                        <span className="sl-caption">
                          Discovery · Balanced buyer · 5–10 minutes
                        </span>
                      </div>
                      <div className="sl-feature-buyer">
                        <span className="sl-avatar large blue">MC</span>
                        <strong>Maya Chen</strong>
                        <span>VP of Operations</span>
                        <div className="sl-buyer-quote">
                          “I’m not sure we need another platform.”
                        </div>
                        <Waveform size={36} weight="light" aria-hidden="true" />
                      </div>
                    </section>
                    <section className="sl-review-feature">
                      <div className="sl-icon-tile">
                        <ChatCircleText size={25} />
                      </div>
                      <h2>
                        Every call has
                        <br />a lesson in it.
                      </h2>
                      <p>
                        Explore a sample transcript, criterion-level feedback,
                        and a focused next practice.
                      </p>
                      <button className="sl-text-button" onClick={showSample}>
                        Explore a sample review <ArrowUpRight size={18} />
                      </button>
                      <div className="sl-review-mini">
                        <span>
                          <CheckCircle size={17} />
                          Discovery & impact
                        </span>
                        <span>
                          <Target size={17} />A specific next step
                        </span>
                      </div>
                    </section>
                  </div>
                  <div className="sl-library-heading">
                    <div>
                      <h2>Find your next conversation</h2>
                      <p>Fictional buyers. Familiar challenges.</p>
                    </div>
                    <label className="sl-search">
                      <span className="sl-sr-only">Search prospects</span>
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search prospects…"
                      />
                    </label>
                  </div>
                  <div className="sl-filters" aria-label="Filter scenarios">
                    {[
                      "All scenarios",
                      "Discovery",
                      "Cold call",
                      "Objections",
                      "Closing",
                    ].map((f) => (
                      <button
                        key={f}
                        className={filter === f ? "selected" : ""}
                        aria-pressed={filter === f}
                        onClick={() => setFilter(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="sl-prospect-grid">
                    {visibleProspects.map((p) => (
                      <button
                        className="sl-prospect"
                        key={p.id}
                        onClick={() => setSelected(p)}
                      >
                        <div className="sl-prospect-top">
                          <span className={`sl-avatar ${p.color}`}>
                            {initials(p.name)}
                          </span>
                          <span
                            className={`sl-difficulty ${p.difficulty.toLowerCase()}`}
                          >
                            {p.difficulty}
                          </span>
                        </div>
                        <h3>{p.name}</h3>
                        <p className="sl-role">{p.role}</p>
                        <p className="sl-company">{p.company}</p>
                        <p className="sl-prospect-brief">{p.brief}</p>
                        <div className="sl-prospect-bottom">
                          <span>{p.type}</span>
                          <ArrowUpRight size={18} />
                        </div>
                      </button>
                    ))}
                  </div>
                  {!visibleProspects.length && (
                    <Empty
                      title="No matching prospects"
                      body="Try another search or create your own scenario."
                    />
                  )}
                  <p className="sl-footnote">
                    An independent project by Garrett Lisowski. Practice data
                    stays in this browser. Guided mode is available without an
                    account.
                  </p>
                </>
              )}
              {section === "reviews" && (
                <>
                  <div className="sl-page-heading">
                    <div>
                      <h1>Turn calls into coaching.</h1>
                      <p>
                        Transcripts, scorecards, and one clear thing to improve.
                      </p>
                    </div>
                    <button
                      className="sl-button"
                      onClick={() => setModal("upload")}
                    >
                      <UploadSimple size={18} />
                      Review a call
                    </button>
                  </div>
                  {workspace.sessions.length ? (
                    <>
                      <label className="sl-search">
                        <span className="sl-sr-only">Search sessions</span>
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search sessions…"
                        />
                      </label>
                      <div className="sl-table-wrap">
                        <table className="sl-table">
                          <thead>
                            <tr>
                              <th scope="col">Conversation</th>
                              <th scope="col">Date</th>
                              <th scope="col">Review</th>
                              <th scope="col">Score</th>
                              <th scope="col">
                                <span className="sl-sr-only">Actions</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredSessions.map((s) => (
                              <tr key={s.id}>
                                <td>
                                  <button
                                    className="sl-table-link"
                                    onClick={() => {
                                      setRecording(null);
                                      setResult(s);
                                    }}
                                  >
                                    {s.title}
                                  </button>
                                  <small>{s.scorecard}</small>
                                </td>
                                <td>
                                  {new Date(s.date).toLocaleDateString(
                                    undefined,
                                    { month: "short", day: "numeric" },
                                  )}
                                </td>
                                <td>
                                  <span className="sl-tag">
                                    {s.review.source === "ai"
                                      ? "AI review"
                                      : "Guided checklist"}
                                  </span>
                                </td>
                                <td>
                                  <strong>{s.review.overall}</strong>
                                  <span className="sl-muted"> /100</span>
                                </td>
                                <td>
                                  <button
                                    className="sl-icon-button"
                                    aria-label={`Delete ${s.title}`}
                                    onClick={() => setDeleteId(s.id)}
                                  >
                                    <Trash size={18} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <Empty
                      icon={ChatCircleText}
                      title="Your first review starts with a conversation."
                      body="Complete a roleplay or bring a transcript. Every review includes evidence, coaching, and a next practice."
                    >
                      <button className="sl-secondary" onClick={showSample}>
                        Explore a sample review <ArrowRight size={17} />
                      </button>
                    </Empty>
                  )}
                </>
              )}
              {section === "progress" && (
                <>
                  <div className="sl-page-heading">
                    <div>
                      <h1>See the work paying off.</h1>
                      <p>
                        Practice history for your active scorecard: {card.name}.
                      </p>
                    </div>
                    <button
                      className="sl-secondary"
                      disabled={!workspace.sessions.length}
                      onClick={() =>
                        download(
                          "sales-lab-sessions.json",
                          JSON.stringify(workspace.sessions, null, 2),
                        )
                      }
                    >
                      <DownloadSimple size={18} />
                      Export sessions
                    </button>
                  </div>
                  <div className="sl-stat-grid">
                    <Stat
                      label="Completed sessions"
                      value={String(metrics.length)}
                      detail="For this scorecard"
                    />
                    <Stat
                      label="Average score"
                      value={avg === null ? "—" : String(avg)}
                      detail="Out of 100 · includes guided checklists"
                    />
                    <Stat
                      label="Practice time"
                      value={`${Math.round(metrics.reduce((a, s) => a + s.seconds, 0) / 60)} min`}
                      detail="Recorded roleplay time"
                    />
                    <Stat
                      label="Personal best"
                      value={
                        metrics.length
                          ? String(
                              Math.max(...metrics.map((s) => s.review.overall)),
                            )
                          : "—"
                      }
                      detail="For this scorecard"
                    />
                  </div>
                  {metrics.length ? (
                    <>
                      <section className="sl-panel">
                        <h2>Recent sessions</h2>
                        <p className="sl-muted">
                          Guided checklist scores indicate language coverage,
                          not validated sales ability.
                        </p>
                        <div
                          className="sl-chart"
                          role="img"
                          aria-label={`Last ${Math.min(12, metrics.length)} session scores: ${metrics
                            .slice(0, 12)
                            .reverse()
                            .map((s) => s.review.overall)
                            .join(", ")}`}
                        >
                          {metrics
                            .slice(0, 12)
                            .reverse()
                            .map((s, i) => (
                              <button
                                key={s.id}
                                onClick={() => {
                                  setRecording(null);
                                  setResult(s);
                                }}
                                title={`${s.title}: ${s.review.overall}`}
                              >
                                <strong>{s.review.overall}</strong>
                                <span
                                  style={{
                                    height: `${Math.max(3, s.review.overall * 1.8)}px`,
                                  }}
                                />
                                <small>{i + 1}</small>
                              </button>
                            ))}
                        </div>
                      </section>
                      <section className="sl-panel">
                        <h2>One thing to work on</h2>
                        <p>{metrics[0].review.nextPractice}</p>
                        <button
                          className="sl-secondary"
                          onClick={() =>
                            setSelected(
                              workspace.prospects.find(
                                (p) => p.name === metrics[0].prospect,
                              ) || workspace.prospects[0],
                            )
                          }
                        >
                          Practice again <ArrowRight size={17} />
                        </button>
                      </section>
                    </>
                  ) : (
                    <Empty
                      icon={TrendUp}
                      title="Start a baseline. Then build on it."
                      body="Your progress appears after a completed session. Use the same scorecard to make comparisons meaningful."
                    >
                      <button
                        className="sl-button"
                        onClick={() => go("practice")}
                      >
                        Choose a prospect <ArrowRight size={18} />
                      </button>
                    </Empty>
                  )}
                </>
              )}
              {section === "training" && (
                <>
                  <div className="sl-page-heading">
                    <div>
                      <h1>Practice with a purpose.</h1>
                      <p>Turn coaching into a repeatable habit.</p>
                    </div>
                    <button
                      className="sl-button"
                      onClick={() =>
                        setWorkspace((w) => ({
                          ...w,
                          assignments: [
                            ...w.assignments,
                            {
                              id: uid(),
                              title:
                                "Discover the business impact before pitching.",
                              prospectId: w.prospects[0].id,
                              target: 80,
                              completed: false,
                              due: "",
                            },
                          ],
                        }))
                      }
                    >
                      <Plus size={18} />
                      Add practice
                    </button>
                  </div>
                  <div className="sl-panel">
                    <p className="sl-muted">
                      This is your personal plan, saved in this browser.
                    </p>
                    {workspace.assignments.length ? (
                      workspace.assignments.map((a) => (
                        <div className="sl-assignment" key={a.id}>
                          <label className="sl-check">
                            <input
                              type="checkbox"
                              checked={a.completed}
                              onChange={(e) =>
                                setWorkspace((w) => ({
                                  ...w,
                                  assignments: w.assignments.map((x) =>
                                    x.id === a.id
                                      ? { ...x, completed: e.target.checked }
                                      : x,
                                  ),
                                }))
                              }
                            />
                            <span className="sl-sr-only">
                              Mark {a.title} complete
                            </span>
                          </label>
                          <div>
                            <label
                              className="sl-sr-only"
                              htmlFor={`goal-${a.id}`}
                            >
                              Practice goal
                            </label>
                            <input
                              id={`goal-${a.id}`}
                              aria-label="Practice goal"
                              value={a.title}
                              maxLength={500}
                              onChange={(e) =>
                                setWorkspace((w) => ({
                                  ...w,
                                  assignments: w.assignments.map((x) =>
                                    x.id === a.id
                                      ? { ...x, title: e.target.value }
                                      : x,
                                  ),
                                }))
                              }
                            />
                            <div className="sl-assignment-details">
                              <label>
                                Prospect
                                <select
                                  value={a.prospectId}
                                  onChange={(e) =>
                                    setWorkspace((w) => ({
                                      ...w,
                                      assignments: w.assignments.map((x) =>
                                        x.id === a.id
                                          ? { ...x, prospectId: e.target.value }
                                          : x,
                                      ),
                                    }))
                                  }
                                >
                                  {workspace.prospects.map((p) => (
                                    <option key={p.id} value={p.id}>
                                      {p.name}
                                    </option>
                                  ))}
                                </select>
                              </label>
                              <label>
                                Due
                                <input
                                  type="date"
                                  value={a.due}
                                  onChange={(e) =>
                                    setWorkspace((w) => ({
                                      ...w,
                                      assignments: w.assignments.map((x) =>
                                        x.id === a.id
                                          ? { ...x, due: e.target.value }
                                          : x,
                                      ),
                                    }))
                                  }
                                />
                              </label>
                            </div>
                          </div>
                          <button
                            className="sl-secondary"
                            onClick={() =>
                              setSelected(
                                workspace.prospects.find(
                                  (p) => p.id === a.prospectId,
                                ) || workspace.prospects[0],
                              )
                            }
                          >
                            Practice <ArrowRight size={16} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <Empty
                        icon={Target}
                        title="A little intention goes a long way."
                        body="Add a practice goal here, or save a coaching recommendation from any call review."
                      />
                    )}
                  </div>
                </>
              )}
              {section === "scorecards" && (
                <>
                  <div className="sl-page-heading">
                    <div>
                      <h1>Define what good looks like.</h1>
                      <p>Choose a methodology. Make the criteria your own.</p>
                    </div>
                    <button
                      className="sl-button"
                      onClick={() =>
                        setScoreDraft({
                          id: uid(),
                          name: "My scorecard",
                          criteria: [
                            {
                              id: uid(),
                              name: "Discovery",
                              description:
                                "Uncover the buyer’s problem and quantify the impact.",
                              weight: 100,
                            },
                          ],
                        })
                      }
                    >
                      <Plus size={18} />
                      New scorecard
                    </button>
                  </div>
                  <div className="sl-scorecard-grid">
                    {workspace.scorecards.map((c) => (
                      <section
                        className={`sl-panel ${card.id === c.id ? "sl-selected-panel" : ""}`}
                        key={c.id}
                      >
                        <div className="sl-row">
                          <ClipboardText size={24} />
                          {card.id === c.id && (
                            <span className="sl-tag">Active scorecard</span>
                          )}
                        </div>
                        <h2>{c.name}</h2>
                        <ul className="sl-criteria-list">
                          {c.criteria.map((x) => (
                            <li key={x.id}>
                              <div>
                                <strong>{x.name}</strong>
                                <p>{x.description}</p>
                              </div>
                              <span>{x.weight}%</span>
                            </li>
                          ))}
                        </ul>
                        <div className="sl-actions">
                          <button
                            className="sl-secondary"
                            disabled={card.id === c.id}
                            onClick={() => {
                              setWorkspace((w) => ({
                                ...w,
                                activeScorecard: c.id,
                              }));
                              setNotice(
                                `${c.name} is now your active scorecard.`,
                              );
                            }}
                          >
                            {card.id === c.id ? (
                              <Check size={16} />
                            ) : (
                              <Target size={16} />
                            )}
                            Use scorecard
                          </button>
                          <button
                            className="sl-text-button"
                            onClick={() => setScoreDraft(structuredClone(c))}
                          >
                            Edit
                          </button>
                        </div>
                      </section>
                    ))}
                  </div>
                </>
              )}
              {section === "context" && (
                <>
                  <div className="sl-page-heading">
                    <div>
                      <h1>Give every call the right context.</h1>
                      <p>
                        Your product, buyer, and sales process inform live AI
                        practice and coaching.
                      </p>
                    </div>
                  </div>
                  <form
                    className="sl-panel sl-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setWorkspace((w) => ({ ...w, context: contextDraft }));
                      setNotice(
                        "Knowledge saved. It will apply to your next live AI session.",
                      );
                    }}
                  >
                    <label htmlFor="knowledge">
                      Product & sales knowledge
                      <textarea
                        id="knowledge"
                        value={contextDraft}
                        maxLength={12000}
                        rows={16}
                        onChange={(e) => setContextDraft(e.target.value)}
                        placeholder={
                          "Product: What do you sell and who is it for?\n\nValue: What measurable problems does it solve?\n\nBuyers: Who decides, influences, and uses it?\n\nObjections: What concerns do you hear?\n\nProof: Which claims can you substantiate?\n\nProcess: How should a good conversation progress?"
                        }
                      />
                    </label>
                    <div className="sl-row">
                      <span className="sl-caption">
                        {contextDraft.length.toLocaleString()} / 12,000
                        characters · saved in this browser
                      </span>
                      <button className="sl-button" type="submit">
                        Save knowledge <Check size={17} />
                      </button>
                    </div>
                    <p className="sl-caption">
                      Live AI sessions send this context and the conversation to
                      OpenAI. Use public or fictional information for portfolio
                      demonstrations. Guided practice uses the built-in script.
                    </p>
                  </form>
                </>
              )}
              {section === "connections" && (
                <>
                  <div className="sl-page-heading">
                    <div>
                      <h1>Your training, connected.</h1>
                      <p>See what is available in this workspace.</p>
                    </div>
                  </div>
                  <section className="sl-panel sl-connection-panel">
                    <div className="sl-icon-tile">
                      <Robot size={26} />
                    </div>
                    <div>
                      <h2>Live AI roleplay & coaching</h2>
                      <p>
                        {live
                          ? "AI text, voice roleplay, transcription, and call scoring are enabled."
                          : status.configured
                            ? "The AI service is configured. Enter a workspace access code to use it."
                            : "Live AI is awaiting the site owner’s service connection. You can explore guided roleplay and checklist reviews now."}
                      </p>
                      <span className="sl-tag">
                        {live
                          ? "Connected"
                          : status.configured
                            ? "Access code required"
                            : "Not connected"}
                      </span>
                    </div>
                    {status.configured && !status.unlocked && (
                      <button
                        className="sl-button"
                        onClick={() => setModal("unlock")}
                      >
                        Enter access code
                      </button>
                    )}
                    {live && (
                      <button
                        className="sl-secondary"
                        onClick={async () => {
                          await api("lock", {});
                          setStatus((s) => ({ ...s, unlocked: false }));
                          setNotice("Live AI access locked.");
                        }}
                      >
                        Lock AI access
                      </button>
                    )}
                  </section>
                  <section className="sl-panel">
                    <h2>Bring your calls</h2>
                    <p>
                      Import a text transcript from your meeting recorder. Audio
                      transcription is available when live AI is connected.
                    </p>
                    <button
                      className="sl-secondary"
                      onClick={() => setModal("upload")}
                    >
                      <UploadSimple size={18} />
                      Import a call
                    </button>
                  </section>
                  <section className="sl-panel">
                    <h2>Workspace storage</h2>
                    <p>
                      Prospects, scorecards, notes, and transcripts are saved on
                      this device. Audio recordings are available to download
                      until you leave the current review. Shared accounts and
                      team synchronization are not connected.
                    </p>
                    <button
                      className="sl-secondary"
                      onClick={() =>
                        download(
                          "sales-lab-workspace.json",
                          JSON.stringify(workspace, null, 2),
                        )
                      }
                    >
                      <DownloadSimple size={18} />
                      Export workspace
                    </button>
                  </section>
                </>
              )}
            </>
          )}
        </main>
        <footer className="sl-footer">
          <span>Sales Lab / Garrett Lisowski</span>
          <Link href="/">
            View portfolio <ArrowUpRight size={14} />
          </Link>
        </footer>
      </div>
      {selected && (
        <Modal title="Your next conversation" close={() => setSelected(null)}>
          <div className="sl-prospect-modal">
            <span className={`sl-avatar ${selected.color}`}>
              {initials(selected.name)}
            </span>
            <div>
              <h3>{selected.name}</h3>
              <p>
                {selected.role} · {selected.company}
              </p>
            </div>
          </div>
          <div className="sl-form">
            <div className="sl-actions">
              <span className="sl-tag">{selected.type}</span>
              <span className="sl-tag">{selected.difficulty}</span>
              <span className="sl-tag">Fictional scenario</span>
            </div>
            <p>{selected.brief}</p>
            <div className="sl-goal">
              <Target size={22} />
              <div>
                <strong>Your objective</strong>
                <p>{selected.goal}</p>
              </div>
            </div>
            <label>
              Scorecard
              <select
                value={workspace.activeScorecard}
                onChange={(e) =>
                  setWorkspace((w) => ({
                    ...w,
                    activeScorecard: e.target.value,
                  }))
                }
              >
                {workspace.scorecards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="sl-start-actions">
              {live ? (
                <>
                  <button
                    className="sl-button"
                    onClick={() => start(selected, "voice")}
                  >
                    <Microphone size={18} />
                    Start voice call
                  </button>
                  <button
                    className="sl-secondary"
                    onClick={() => start(selected, "text")}
                  >
                    <ChatCircleText size={18} />
                    Practice in text
                  </button>
                </>
              ) : (
                <button
                  className="sl-button"
                  onClick={() => start(selected, "guided")}
                >
                  Start guided practice <ArrowRight size={18} />
                </button>
              )}
            </div>
            <p className="sl-caption">
              {live
                ? "Voice requires microphone access. Audio and text are processed by OpenAI."
                : "Guided practice uses a scripted buyer and a language checklist. Live AI voice and coaching are not connected yet."}
            </p>
          </div>
        </Modal>
      )}
      {modal === "prospect" && (
        <ProspectForm
          close={() => setModal(null)}
          save={(p) => {
            setWorkspace((w) => ({ ...w, prospects: [...w.prospects, p] }));
            setModal(null);
            setSelected(p);
          }}
        />
      )}
      {modal === "upload" && (
        <Modal title="Review a call" close={() => !busy && setModal(null)}>
          <form className="sl-form" onSubmit={reviewUpload}>
            <p className="sl-muted">
              {live
                ? "Get AI feedback against your active scorecard."
                : "Check a transcript against your scorecard with the guided language checklist."}
            </p>
            {error && (
              <p className="sl-error" role="alert">
                {error}
              </p>
            )}
            <label>
              Call title
              <input
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                maxLength={160}
                placeholder="Discovery with an operations leader"
              />
            </label>
            <label className="sl-file-input">
              <UploadSimple size={20} />
              Import .txt, .vtt, .srt or audio (4 MB max)
              <input
                type="file"
                accept=".txt,.vtt,.srt,.mp3,.wav,.m4a,.webm"
                onChange={(e) => uploadFile(e.target.files?.[0])}
                disabled={busy}
              />
            </label>
            <label>
              Transcript
              <textarea
                required
                value={reviewText}
                maxLength={30000}
                onChange={(e) => setReviewText(e.target.value)}
                rows={10}
                placeholder={
                  "Rep: What prompted you to explore this?\nBuyer: Our current process is too manual…"
                }
              />
            </label>
            <div className="sl-row">
              <span className="sl-caption">
                Label each speaker Rep: or Buyer:.{" "}
                {live
                  ? "Sent to OpenAI for review."
                  : "Processed in this browser."}
              </span>
              <button
                className="sl-text-button"
                type="button"
                onClick={() => {
                  setReviewText(sampleTranscript);
                  setReviewTitle("Sample discovery conversation");
                }}
              >
                Use sample
              </button>
            </div>
            <button className="sl-button" disabled={busy || !reviewText.trim()}>
              {busy ? "Processing…" : "Review transcript"}
              <ArrowRight size={17} />
            </button>
          </form>
        </Modal>
      )}
      {modal === "unlock" && (
        <Modal title="Unlock live AI" close={() => setModal(null)}>
          <form
            className="sl-form"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              setError("");
              try {
                await api("unlock", {
                  code: new FormData(e.currentTarget).get("code"),
                });
                setStatus((s) => ({ ...s, unlocked: true }));
                setModal(null);
                setNotice("Live AI is ready. Choose a prospect to begin.");
              } catch (e) {
                setError(errorText(e));
              } finally {
                setBusy(false);
              }
            }}
          >
            {error && <p className="sl-error">{error}</p>}
            <p>
              Enter the access code provided by Garrett. This unlocks live AI
              usage for one hour.
            </p>
            <label>
              Access code
              <input
                name="code"
                type="password"
                required
                autoComplete="off"
                maxLength={200}
              />
            </label>
            <button className="sl-button" disabled={busy}>
              Unlock <ArrowRight size={18} />
            </button>
          </form>
        </Modal>
      )}
      {deleteId && (
        <Modal title="Delete this session?" close={() => setDeleteId(null)}>
          <p>
            This removes the transcript and review from this browser. Export it
            first if you want a copy.
          </p>
          <div className="sl-actions">
            <button className="sl-secondary" onClick={() => setDeleteId(null)}>
              Keep session
            </button>
            <button
              className="sl-button sl-end"
              onClick={() => {
                setWorkspace((w) => ({
                  ...w,
                  sessions: w.sessions.filter((s) => s.id !== deleteId),
                }));
                setDeleteId(null);
              }}
            >
              Delete session
            </button>
          </div>
        </Modal>
      )}
      {scoreDraft && (
        <Modal title="Edit scorecard" close={() => setScoreDraft(null)}>
          <form
            className="sl-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!validateScorecard(scoreDraft)) {
                setError(
                  "Criteria need unique names, descriptions, positive weights, and a total of 100%.",
                );
                return;
              }
              setWorkspace((w) => ({
                ...w,
                scorecards: w.scorecards.some((c) => c.id === scoreDraft.id)
                  ? w.scorecards.map((c) =>
                      c.id === scoreDraft.id ? scoreDraft : c,
                    )
                  : [...w.scorecards, scoreDraft],
                activeScorecard: scoreDraft.id,
              }));
              setScoreDraft(null);
              setError("");
              setNotice("Scorecard saved and set as active.");
            }}
          >
            {error && <p className="sl-error">{error}</p>}
            <label>
              Scorecard name
              <input
                required
                value={scoreDraft.name}
                onChange={(e) =>
                  setScoreDraft({ ...scoreDraft, name: e.target.value })
                }
                maxLength={80}
              />
            </label>
            {scoreDraft.criteria.map((c, i) => (
              <fieldset className="sl-criterion-edit" key={c.id}>
                <legend>Criterion {i + 1}</legend>
                <div className="sl-form-grid">
                  <label>
                    Name
                    <input
                      required
                      maxLength={80}
                      value={c.name}
                      onChange={(e) =>
                        setScoreDraft({
                          ...scoreDraft,
                          criteria: scoreDraft.criteria.map((x) =>
                            x.id === c.id ? { ...x, name: e.target.value } : x,
                          ),
                        })
                      }
                    />
                  </label>
                  <label>
                    Weight (%)
                    <input
                      required
                      type="number"
                      min={1}
                      max={100}
                      value={c.weight}
                      onChange={(e) =>
                        setScoreDraft({
                          ...scoreDraft,
                          criteria: scoreDraft.criteria.map((x) =>
                            x.id === c.id
                              ? { ...x, weight: Number(e.target.value) }
                              : x,
                          ),
                        })
                      }
                    />
                  </label>
                </div>
                <label>
                  What good looks like
                  <textarea
                    required
                    maxLength={500}
                    rows={2}
                    value={c.description}
                    onChange={(e) =>
                      setScoreDraft({
                        ...scoreDraft,
                        criteria: scoreDraft.criteria.map((x) =>
                          x.id === c.id
                            ? { ...x, description: e.target.value }
                            : x,
                        ),
                      })
                    }
                  />
                </label>
                <button
                  type="button"
                  className="sl-text-button"
                  disabled={scoreDraft.criteria.length < 2}
                  onClick={() =>
                    setScoreDraft({
                      ...scoreDraft,
                      criteria: scoreDraft.criteria.filter(
                        (x) => x.id !== c.id,
                      ),
                    })
                  }
                >
                  Remove criterion
                </button>
              </fieldset>
            ))}
            <div className="sl-row">
              <button
                className="sl-secondary"
                type="button"
                disabled={scoreDraft.criteria.length >= 12}
                onClick={() =>
                  setScoreDraft({
                    ...scoreDraft,
                    criteria: [
                      ...scoreDraft.criteria,
                      { id: uid(), name: "", weight: 10, description: "" },
                    ],
                  })
                }
              >
                <Plus size={17} />
                Add criterion
              </button>
              <strong>
                Total: {scoreDraft.criteria.reduce((a, c) => a + c.weight, 0)}%
              </strong>
            </div>
            <button className="sl-button" type="submit">
              Save scorecard <Check size={18} />
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="sl-stat">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}
function ReviewPanel({
  session: s,
  recording,
  back,
  retry,
  addTraining,
  notes,
}: {
  session: Session;
  recording: string | null;
  back: () => void;
  retry: () => void;
  addTraining: () => void;
  notes: (text: string) => void;
}) {
  const [note, setNote] = useState(s.notes);
  const [noteSaved, setNoteSaved] = useState(false);
  return (
    <>
      <button className="sl-text-button sl-back" onClick={back}>
        <ArrowLeft size={17} />
        All reviews
      </button>
      <div className="sl-page-heading">
        <div>
          <p className="sl-eyebrow">
            {s.id === "sample"
              ? "SAMPLE REVIEW"
              : s.review.source === "ai"
                ? "AI COACHING"
                : "GUIDED CHECKLIST"}
          </p>
          <h1>{s.title}</h1>
          <p>
            {s.scorecard} · {s.seconds ? time(s.seconds) : "Transcript review"}
          </p>
        </div>
        <button
          className="sl-secondary"
          onClick={() =>
            download("sales-lab-review.json", JSON.stringify(s, null, 2))
          }
        >
          <DownloadSimple size={18} />
          Export review
        </button>
      </div>
      <div className="sl-review-layout">
        <div>
          <section className="sl-panel sl-summary">
            <div className="sl-score-number">
              <strong>{s.review.overall}</strong>
              <span>/ 100</span>
            </div>
            <div>
              <h2>Conversation review</h2>
              <p>{s.review.summary}</p>
              <span className="sl-tag">
                {s.review.source === "ai"
                  ? "AI-generated coaching"
                  : "Language coverage · not an AI score"}
              </span>
            </div>
          </section>
          <section className="sl-panel">
            <h2>Your scorecard</h2>
            <div className="sl-score-rows">
              {s.review.scores.map((c, i) => (
                <article key={i}>
                  <div className="sl-row">
                    <h3>{c.criterion}</h3>
                    <strong>
                      {c.score}
                      <span className="sl-muted"> /100</span>
                    </strong>
                  </div>
                  <blockquote>{c.evidence}</blockquote>
                  <p>{c.coaching}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="sl-panel">
            <h2>Conversation transcript</h2>
            {recording && (
              <div className="sl-recording">
                <audio src={recording} controls />
                <a
                  className="sl-text-button"
                  href={recording}
                  download="sales-lab-call.webm"
                >
                  Download recording
                </a>
              </div>
            )}
            <div className="sl-review-transcript">
              {s.messages.map((m, i) => (
                <div key={i}>
                  <strong>{m.role === "user" ? "Rep" : "Buyer"}</strong>
                  <p>{m.content}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside>
          <section className="sl-panel sl-coaching">
            <span className="sl-icon-tile">
              <Sparkle size={24} />
            </span>
            <h2>Your next best practice.</h2>
            <p>{s.review.nextPractice}</p>
            <button className="sl-button" onClick={retry}>
              Practice again <ArrowRight size={17} />
            </button>
            <button className="sl-text-button" onClick={addTraining}>
              <Plus size={17} />
              Add to training plan
            </button>
          </section>
          <section className="sl-panel">
            <h3>What to keep</h3>
            <ul className="sl-feedback-list">
              {s.review.strengths.map((t, i) => (
                <li key={i}>
                  <CheckCircle size={18} />
                  {t}
                </li>
              ))}
            </ul>
            <h3>What to work on</h3>
            <ul className="sl-feedback-list">
              {s.review.improvements.map((t, i) => (
                <li key={i}>
                  <Target size={18} />
                  {t}
                </li>
              ))}
            </ul>
          </section>
          {s.id !== "sample" && (
            <form
              className="sl-panel sl-form"
              onSubmit={(e) => {
                e.preventDefault();
                notes(note);
                setNoteSaved(true);
              }}
            >
              <label>
                Your reflection
                <textarea
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                    setNoteSaved(false);
                  }}
                  maxLength={3000}
                  rows={5}
                  placeholder="What will you try differently next time?"
                />
              </label>
              <button className="sl-secondary" type="submit">
                {noteSaved ? "Saved" : "Save reflection"}
              </button>
            </form>
          )}
        </aside>
      </div>
    </>
  );
}
