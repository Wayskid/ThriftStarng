import ButtonLoader from "../ButtonLoader";
import "./appButton.scss";

export default function AppButton({
  version,
  type,
  label,
  isLoading,
  isDisabled,
  onClick,
}: {
  version: "primaryBtn" | "secondaryBtn" | "textOnly";
  type?: "button" | "submit";
  label: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      className={`appBtn ${version}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <ButtonLoader /> : label}
    </button>
  );
}
