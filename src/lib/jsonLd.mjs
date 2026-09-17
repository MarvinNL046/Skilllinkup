// Structured data is injected with dangerouslySetInnerHTML. Values can come from
// the URL or the database, so "<" is escaped to stop a "</script>" sequence from
// closing the tag and running attacker-controlled markup.
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
