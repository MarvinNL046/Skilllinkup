export default function ProjectPriceWidget1({ budgetMin, budgetMax, currency, scrollToBid }) {
  const cur = currency || "EUR";
  const budgetDisplay =
    budgetMin != null && budgetMax != null
      ? `${cur} ${budgetMin} - ${budgetMax}`
      : budgetMin != null
      ? `${cur} ${budgetMin}+`
      : "Budget TBD";

  return (
    <>
      <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">{budgetDisplay}</h3>
        <p className="text fz14">Fixed Price</p>
        <div className="d-grid">
          <button
            type="button"
            className="ud-btn btn-thm"
            onClick={() => scrollToBid?.()}
          >
            Submit a Proposal
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </>
  );
}
