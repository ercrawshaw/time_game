export default function OptionCard({
  icon,
  label,
  example,
  selected,
  onSelect,
  className = "",
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`optionCard ${className} ${
        selected ? "selected" : ""
      }`.trim()}
      onClick={onSelect}
    >
      {icon && (
        <span className="optionIcon">
          {icon}
        </span>
      )}

      <span>{label}</span>

      {example && (
        <span className="optionExample">
          {example}
        </span>
      )}
    </button>
  );
}
