export const CONTACT_TOPICS = ["general", "account", "freelancer", "client", "payment", "partnership", "bug"];
export function validateContact(input) {
  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim().toLowerCase();
  const subject = String(input.subject ?? "");
  const message = String(input.message ?? "").trim();
  if (name.length < 2 || name.length > 100) return { error: "Enter a name between 2 and 100 characters." };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (!CONTACT_TOPICS.includes(subject)) return { error: "Choose a topic for your message." };
  if (message.length < 20 || message.length > 5000) return { error: "Write a message between 20 and 5,000 characters." };
  return { value: { name, email, subject, message } };
}
