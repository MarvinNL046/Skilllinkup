export const ACCOUNT_EXPORT_SECTIONS = [
  "account",
  "providerProfiles",
  "clientOrders",
  "projects",
  "jobs",
  "applications",
  "quoteRequests",
  "reports",
  "supportTickets",
  "savedItems",
  "portfolio",
  "experience",
  "education",
  "certifications",
  "reviewsGiven",
  "reviewsReceived",
  "notifications",
  "notificationSettings",
  "fileAssets",
  "companyVerificationRequests",
  "participant1Conversations",
  "participant2Conversations",
  "clientAppointments",
  "creditTransactions",
  "rewardTransactions",
  "feedback",
];

export async function collectAccountExport(
  fetchSection,
  onProgress = () => {},
  signal,
) {
  const queue = ACCOUNT_EXPORT_SECTIONS.map((section) => ({ section }));
  const scheduled = new Set(queue.map((item) => `${item.section}:`));
  const data = {};
  let records = 0;
  const startedAt = new Date().toISOString();
  for (let index = 0; index < queue.length; index++) {
    const request = queue[index];
    const bucket = (data[request.section] ||= new Map());
    const cursors = new Set();
    let cursor = null;
    while (true) {
      signal?.throwIfAborted();
      const page = await fetchSection({ ...request, cursor });
      signal?.throwIfAborted();
      const items = JSON.parse(page.itemsJson);
      if (!Array.isArray(items))
        throw new Error("The export returned invalid data. Please try again.");
      for (const item of items) {
        const key = item._id || item.id || JSON.stringify(item);
        if (!bucket.has(key)) records++;
        bucket.set(key, item);
      }
      for (const child of page.nextSections || []) {
        const key = `${child.section}:${child.scopeId || ""}`;
        if (!scheduled.has(key)) {
          scheduled.add(key);
          queue.push(child);
        }
      }
      onProgress({ records, sections: index + 1, totalSections: queue.length });
      if (page.isDone) break;
      if (!page.continueCursor || cursors.has(page.continueCursor))
        throw new Error(
          "The export could not finish paging your data. Please try again.",
        );
      cursor = page.continueCursor;
      cursors.add(cursor);
    }
  }
  return {
    exportVersion: 2,
    startedAt,
    exportedAt: new Date().toISOString(),
    fileContentsIncluded: false,
    data: Object.fromEntries(
      Object.entries(data).map(([section, items]) => [
        section,
        [...items.values()],
      ]),
    ),
  };
}
