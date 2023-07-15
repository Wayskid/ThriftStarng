import { ChangeEvent } from "react";

export default function AppInputSelect({
  version,
  list,
  value,
  label,
  name,
  onChange,
}: {
  version?: string;
  list: string[] | number[];
  value: string;
  label?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className={`appInputSelect ${version === "stock" && "stockSelect"}`}>
      <label htmlFor="standard-select">{label}</label>
      <div className="select">
        <select
          id="standard-select"
          name={name}
          onChange={onChange}
          value={value}
        >
          {list?.map((v) => (
            <option
              key={version === "stock" ? (v as number) + 1 : v}
              value={version === "stock" ? (v as number) + 1 : v}
            >
              {version === "stock" ? (v as number) + 1 : v}
            </option>
          ))}
          {/* <option value="Option length">
            Option that has too long of a value to fit
          </option> */}
        </select>
        <span className="focus"></span>
      </div>
    </div>
  );
}
