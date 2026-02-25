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
}

export default function SelectInput({
  label,
  value,
  options,
  placeholder = "Select an option",
  onChange,
  id,
}: SelectInputProps) {
  return (
    <div className="form-style1 mb20">
      <label className="heading-color ff-heading fw500 mb10" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="form-select"
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
    </div>
  );
}
