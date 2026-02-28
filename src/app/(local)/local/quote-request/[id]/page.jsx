export const metadata = { title: "Quote Request — SkillLinkup" };

export default async function QuoteRequestDetailPage({ params }) {
  const { id } = await params;
  return (
    <section className="pt30 pb90">
      <div className="container">
        <h2>Quote Request</h2>
        <p className="body-color">Detail page for quote request — full quote submission form coming soon.</p>
      </div>
    </section>
  );
}
