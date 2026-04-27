export default function Switch1({ i }) {
  return (
    <>
      <div className="switch-style1">
        <div className="form-check form-switch mb-5">
          <input
            className="form-check-input"
            type="checkbox"
            id={`flexSwitchCheckDefault${i}`}
          />
          <label
            className="form-check-label"
            htmlFor={`flexSwitchCheckDefault${i}`}
          >
            Items
          </label>
        </div>
      </div>
    </>
  );
}
