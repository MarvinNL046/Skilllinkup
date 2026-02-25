"use client";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
  id?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}

export default function SelectInput({
  label,
  value,
  options,
  placeholder = "Select an option",
  onChange,
  id,
  isInvalid,
  errorMessage,
}: SelectInputProps) {
  return (
    <div className="form-style1 mb20">
      <label className="heading-color ff-heading fw500 mb10" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={`form-select ${isInvalid ? "is-invalid" : ""}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isInvalid && errorMessage && (
        <div className="invalid-feedback d-block">{errorMessage}</div>
      )}
    </div>
  );
}
