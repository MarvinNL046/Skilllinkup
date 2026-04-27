export default function Input1({ lebel, placeholder }) {
  return (
    <>
      <div className="form-style1">
        <label className="form-label font-medium text-base dark-color">{lebel}</label>
        <input type="text" className="form-control" placeholder={placeholder} />
      </div>
    </>
  );
}
