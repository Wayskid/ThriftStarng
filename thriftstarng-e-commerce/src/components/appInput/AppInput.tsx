import { ChangeEvent, useState } from "react";
import "./appInput.scss";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export default function AppInput({
  version,
  type,
  name,
  id,
  readOnly,
  placeholder,
  label,
  value,
  onChange,
  required,
  showHidePass,
  pattern,
}: {
  version: string;
  type?: string;
  name: string;
  id: string;
  placeholder?: string;
  label?: string;
  readOnly?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  showHidePass?: boolean;
  pattern?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={version}>
      <input
        type={showPassword ? "text" : type}
        id={id}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        value={value}
        onChange={onChange}
        pattern={pattern}
      />
      <label htmlFor={id}>{label}</label>

      {showHidePass && (
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      )}
    </div>
  );
}
