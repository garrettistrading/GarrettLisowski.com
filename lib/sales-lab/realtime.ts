import type { Message } from "./model";
export type TranscriptEvent = {
  type: string;
  item_id?: string;
  previous_item_id?: string;
  transcript?: string;
  item?: { id?: string; role?: string };
};
// Reserve turns when audio is committed. Transcription can finish after the buyer
// starts answering; filling the reserved turn keeps the transcript in call order.
export function updateTranscript(
  turns: Message[],
  event: TranscriptEvent,
): Message[] {
  let id = event.item_id || event.item?.id;
  let role: Message["role"] | undefined;
  let content: string | undefined;
  if (event.type === "input_audio_buffer.committed") role = "user";
  else if (
    [
      "conversation.item.created",
      "conversation.item.added",
      "response.output_item.added",
    ].includes(event.type)
  ) {
    if (event.item?.role === "user" || event.item?.role === "assistant")
      role = event.item.role;
  } else if (
    event.type === "conversation.item.input_audio_transcription.completed"
  ) {
    role = "user";
    content = event.transcript;
  } else if (event.type === "response.output_audio_transcript.done") {
    role = "assistant";
    content = event.transcript;
  }
  if (!id || !role) return turns;
  id = String(id);
  const index = turns.findIndex((t) => t.id === id);
  if (index >= 0)
    return content === undefined
      ? turns
      : turns.map((t, i) => (i === index ? { ...t, content } : t));
  const message: Message = { id, role, content: content || "" };
  const previous = event.previous_item_id
    ? turns.findIndex((t) => t.id === event.previous_item_id)
    : -1;
  if (previous >= 0)
    return [
      ...turns.slice(0, previous + 1),
      message,
      ...turns.slice(previous + 1),
    ];
  return [...turns, message];
}
