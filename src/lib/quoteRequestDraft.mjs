export const EMPTY_QUOTE_REQUEST = Object.freeze({ categoryId: "", title: "", description: "", city: "", postcode: "", country: "Netherlands", budget: "EUR250 - EUR500", preferredDate: "" });

export function quoteRequestDraftKey(userId) {
  return userId ? `skilllinkup-local-request-draft:${userId}` : null;
}

export function restoreQuoteRequestDraft(raw) {
  try {
    const draft = JSON.parse(raw || "null");
    if (draft?.version !== 1 || !draft.form || typeof draft.form !== "object" || Array.isArray(draft.form)) return null;
    return Object.fromEntries(Object.entries(EMPTY_QUOTE_REQUEST).map(([key, fallback]) => [key, typeof draft.form[key] === "string" ? draft.form[key].slice(0, key === "description" ? 5000 : 200) : fallback]));
  } catch {
    return null;
  }
}
