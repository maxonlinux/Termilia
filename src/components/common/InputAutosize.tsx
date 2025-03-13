interface InputAutosizeProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  ref: React.RefObject<HTMLInputElement>;
}

export default function InputAutosize({
  className,
  value,
  ref,
  ...props
}: InputAutosizeProps) {
  return (
    <div className={`grid ${className}`}>
      <span className="invisible" style={{ gridArea: " 1 / 1 " }}>
        {value ? value.replace(/ /g, "\u00A0") : "\u00A0"}
      </span>
      <input
        ref={ref}
        size={1}
        type="text"
        value={value}
        style={{ gridArea: " 1 / 1 " }}
        className="appearance-none focus:outline-none"
        {...props}
      />
    </div>
  );
}
