export const MESSAGE_MAX_LENGTH = 3000;

// Product names and normal project discussion are allowed. Only actionable
// contact details are restricted by the marketplace's on-platform policy.
const contactPatterns = [
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  /(?:https?:\/\/|www\.|\b(?:wa\.me|t\.me)\/)/i,
  /(?:\b(?:call|phone|mobile|whatsapp|tel)\s*[:=]?\s*|\+)(?:\d[\s().-]*){7,15}\d\b/i,
  /\b(?:instagram|telegram|skype)\s*(?:handle|username|:)\s*:?\s*@?[a-z0-9_.]{3,}/i,
];

export function getMessagePolicyError(text) {
  const content = typeof text === "string" ? text.trim() : "";
  if (!content) return "Write a message.";
  if (content.length > MESSAGE_MAX_LENGTH) return "Messages cannot exceed 3,000 characters.";
  if (contactPatterns.some((pattern) => pattern.test(content))) {
    return "Keep contact details and external links off the chat. Make arrangements here on Skilllinkup.";
  }
  return null;
}
